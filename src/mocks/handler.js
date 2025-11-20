// src/mocks/handler.js
// MSW handlers implementing the provisional backend API spec in apiList.txt
import { http, HttpResponse } from 'msw'

// In-memory stores (reset on page reload)
let users = [
  { userId: '1', email: 'alice@example.com', password: 'P@ssw0rd!', nickname: '앨리스' },
]

let groups = [] // each group: { groupId, leaderId, title, ..., members:[{memberId,userId,nickname,role}], plans:[], candidates:{callCnt, list:[]}, requirements:[] }

// Simple helpers
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const periodRegex = /^(\d+)박\s*(\d+)일$/
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/

const findUser = (userId) => users.find(u => u.userId === userId)

function generateId(prefix) {
  return (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2,8)
}

export const handlers = [
  // 로그인
  http.post('/api/login', async ({ request }) => {
    try {
      const { email, password } = await request.json()
      if (!emailRegex.test(email || '') || (password || '').length < 6) {
        return HttpResponse.json({ message: '이메일/비밀번호 형식 위반' }, { status: 400 })
      }
      const user = users.find(u => u.email === email)
      if (!user) {
        return HttpResponse.json({ message: '대상 이메일 없음' }, { status: 404 })
      }
      if (user.password !== password) {
        return HttpResponse.json({ message: '비밀번호 불일치' }, { status: 401 })
      }
      return HttpResponse.json({ userId: user.userId, message: '로그인이 완료되었습니다.' })
    } catch (e) {
      return HttpResponse.json({ message: '서버 오류' }, { status: 500 })
    }
  }),

  // 로그아웃 (단순 성공 응답)
  http.post('/api/logout', () => {
    return HttpResponse.json({ message: '로그아웃 성공' })
  }),

  // 회원가입 (POST /api/users)
  http.post('/api/users', async ({ request }) => {
    try {
      const { email, password, nickname } = await request.json()
      if (!emailRegex.test(email || '') || (password || '').length < 6 || !nickname || nickname.length < 1) {
        return HttpResponse.json({ message: '이메일/비밀번호/닉네임 형식 위반' }, { status: 400 })
      }
      if (users.some(u => u.email === email)) {
        return HttpResponse.json({ message: '이미 존재하는 이메일' }, { status: 409 })
      }
      const newUser = { userId: generateId('u'), email, password, nickname }
      users.push(newUser)
      return HttpResponse.json({ userId: newUser.userId, message: '회원가입이 완료되었습니다.' })
    } catch (e) {
      return HttpResponse.json({ message: '서버 오류' }, { status: 500 })
    }
  }),

  // 사용자 삭제 (DELETE /api/users?userId=...)
  http.delete('/api/users', async ({ request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const user = findUser(userId)
    if (!user) {
      return HttpResponse.json({ message: '해당 userid 존재하지 않음' }, { status: 404 })
    }
    users = users.filter(u => u.userId !== userId)
    // Also remove user from groups membership
    groups.forEach(g => { g.members = g.members.filter(m => m !== userId) })
    return HttpResponse.json({ message: '사용자 삭제 완료' })
  }),

  // 내 정보 조회 (GET /api/users/me?userId=...)
  http.get('/api/users/me', ({ request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const user = findUser(userId)
    if (!user) {
      return HttpResponse.json({ message: '해당 userId 없음' }, { status: 404 })
    }
    return HttpResponse.json({ userId: user.userId, nickname: user.nickname, email: user.email })
  }),

  // 사용자 정보 수정 (PUT /api/users?userId=...)
  http.put('/api/users', async ({ request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const user = findUser(userId)
    if (!user) {
      return HttpResponse.json({ message: '대상 userid 없음' }, { status: 404 })
    }
    try {
      const { nickname, password, email } = await request.json()
      if (!nickname || nickname.length < 1 || !emailRegex.test(email || '') || (password || '').length < 6) {
        return HttpResponse.json({ message: '닉네임/비밀번호/이메일 형식 위반' }, { status: 400 })
      }
      if (email !== user.email && users.some(u => u.email === email)) {
        return HttpResponse.json({ message: '이미 존재하는 이메일' }, { status: 409 })
      }
      user.nickname = nickname
      user.password = password
      user.email = email
      return HttpResponse.json({ userId: user.userId, message: '사용자 정보 변경 완료' })
    } catch (e) {
      return HttpResponse.json({ message: '서버 오류' }, { status: 500 })
    }
  }),

  // 그룹 생성 (POST /api/groups?userId=... leader)
  http.post('/api/groups', async ({ request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const leader = findUser(userId)
    if (!leader) {
      return HttpResponse.json({ message: '사용자 없음' }, { status: 404 })
    }
    try {
      const { title, region, startingPlace, endingPlace, transportation, period, budget, rDeadline } = await request.json()
      if (!title || !region || !startingPlace || !endingPlace || !transportation) {
        return HttpResponse.json({ message: '입력 값 누락' }, { status: 400 })
      }
      if (!periodRegex.test(period || '') || (budget || 0) < 10000 || !isoDateRegex.test(rDeadline || '')) {
        return HttpResponse.json({ message: '입력 값 형식 위반' }, { status: 400 })
      }
      const groupId = generateId('g')
      groups.push({
        groupId,
        leaderId: leader.userId,
        title,
        region,
        startingPlace,
        endingPlace,
        transportation,
        period,
        budget,
        rDeadline,
        pDeadline: null,
        members: [{ memberId: generateId('m'), userId: leader.userId, nickname: leader.nickname, role: 'LEADER' }],
        plans: [],
        candidates: { callCnt: 0, list: [] },
        requirements: []
      })
      return HttpResponse.json({ groupId, message: '그룹 생성 완료' })
    } catch (e) {
      return HttpResponse.json({ message: '서버 오류' }, { status: 500 })
    }
  }),

  // 가입한 모임 전체 조회 (GET /api/groups?userId=...)
  http.get('/api/groups', ({ request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const user = findUser(userId)
    if (!user) {
      return HttpResponse.json({ message: '해당 사용자 없음' }, { status: 404 })
    }
    const memberGroups = groups.filter(g => g.members.some(m => m.userId === userId))
    if (memberGroups.length === 0) {
      return HttpResponse.json({ exists: false, groupList: [] })
    }
    return HttpResponse.json({
      exists: true,
      groupList: memberGroups.map(g => ({
        groupId: g.groupId,
        title: g.title,
        region: g.region,
        period: g.period,
        role: g.leaderId === userId ? 'LEADER' : 'MEMBER'
      }))
    })
  }),

  // 모임 정보 조회 (GET /api/groups/:groupId)
  http.get('/api/groups/:groupId', ({ params }) => {
    const { groupId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) {
      return HttpResponse.json({ message: '해당 groupId 없음' }, { status: 404 })
    }
    return HttpResponse.json({
      title: group.title,
      region: group.region,
      startingPlace: group.startingPlace,
      endingPlace: group.endingPlace,
      transportation: group.transportation,
      period: group.period,
      budget: group.budget,
      rDeadline: group.rDeadline,
      pDeadline: group.pDeadline
    })
  }),

  // 모임 삭제 (DELETE /api/groups/:groupId?userId=...)
  http.delete('/api/groups/:groupId', ({ params, request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const { groupId } = params
    const idx = groups.findIndex(g => g.groupId === groupId)
    if (idx === -1) {
      return HttpResponse.json({ message: '해당 groupId 없음' }, { status: 404 })
    }
    const g = groups[idx]
    if (g.leaderId !== userId) {
      return HttpResponse.json({ message: '리더가 아님' }, { status: 403 })
    }
    groups.splice(idx, 1)
    return HttpResponse.json({ message: '그룹 삭제가 완료되었습니다.' })
  }),

  // 모임 정보 수정 (PUT /api/groups/:groupId?userId=...)
  http.put('/api/groups/:groupId', async ({ params, request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const { groupId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) {
      return HttpResponse.json({ message: '해당 groupId 없음' }, { status: 404 })
    }
    if (group.leaderId !== userId) {
      return HttpResponse.json({ message: '리더가 아님' }, { status: 403 })
    }
    try {
      const { title, region, startingPlace, endingPlace, transportation, period, budget, rDeadline } = await request.json()
      if (!title || !region || !startingPlace || !endingPlace || !transportation) {
        return HttpResponse.json({ message: '값 형식 위반' }, { status: 400 })
      }
      if (!periodRegex.test(period || '') || (budget || 0) < 10000 || !isoDateRegex.test(rDeadline || '')) {
        return HttpResponse.json({ message: '값 형식 위반(기간/예산/마감)' }, { status: 400 })
      }
      Object.assign(group, { title, region, startingPlace, endingPlace, transportation, period, budget, rDeadline })
      return HttpResponse.json({ groupId: group.groupId, message: '그룹 정보가 변경되었습니다.' })
    } catch (e) {
      return HttpResponse.json({ message: '서버 오류' }, { status: 500 })
    }
  }),

  // ===== Members =====
  // GET members of group
  http.get('/api/groups/:groupId/members', ({ params }) => {
    const { groupId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: '해당 groupId 없음' }, { status: 404 })
    return HttpResponse.json({ Members: group.members.map(m => ({ memberId: m.memberId, userId: m.userId, nickname: m.nickname, role: m.role })) })
  }),
  // Add member (idempotent)
  http.post('/api/groups/:groupId/members', ({ params, request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const { groupId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: '존재하지 않는 groupId' }, { status: 404 })
    const user = findUser(userId)
    if (!user) return HttpResponse.json({ message: '존재하지 않는 userId' }, { status: 404 })
    if (!group.members.some(m => m.userId === userId)) {
      group.members.push({ memberId: generateId('m'), userId, nickname: user.nickname, role: 'MEMBER' })
    }
    return HttpResponse.json({ message: '유저가 그룹에 성공적으로 추가되었습니다.' })
  }),

  // ===== Invites (accept) =====
  http.post('/api/invites/:groupId', ({ params, request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const { groupId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: '해당 groupId 없음' }, { status: 404 })
    const user = findUser(userId)
    if (!user) return HttpResponse.json({ message: '존재하지 않는 userId' }, { status: 404 })
    if (!group.members.some(m => m.userId === userId)) {
      group.members.push({ memberId: generateId('m'), userId, nickname: user.nickname, role: 'MEMBER' })
    }
    return HttpResponse.json({ message: '초대 수락 완료' })
  }),

  // ===== Plans =====
  // Create plan (POST /api/groups/:groupId/plans)
  http.post('/api/groups/:groupId/plans', async ({ params }) => {
    const { groupId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: 'groupId 잘못됨' }, { status: 404 })
    return HttpResponse.json({ message: '여행 계획 생성(모킹: 내용 없음)' })
  }),
  // GET all plans
  http.get('/api/groups/:groupId/plans', ({ params }) => {
    const { groupId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: 'groupId 잘못됨' }, { status: 404 })
    // isLeader flag
    return HttpResponse.json({ isLeader: true, plans: group.plans })
  }),
  // POST new individual plan (/new-plans)
  http.post('/api/groups/:groupId/new-plans', async ({ params, request }) => {
    const { groupId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: 'groupId 잘못됨' }, { status: 404 })
    try {
      const body = await request.json()
      const { starting_time, ending_time, location, transportation, cost } = body
      if (!starting_time || !ending_time || !location || !transportation || typeof cost !== 'number' || cost <= 0) {
        return HttpResponse.json({ message: '필수 값 누락 또는 cost 형식 오류' }, { status: 400 })
      }
      const plan = { plan_id: generateId('p'), ...body }
      group.plans.push(plan)
      return HttpResponse.json({ message: '여행 계획 수정이 완료되었습니다.' })
    } catch (e) {
      return HttpResponse.json({ message: '서버 오류' }, { status: 500 })
    }
  }),
  // Update plan
  http.put('/api/groups/:groupId/plans/:planId', async ({ params, request }) => {
    const { groupId, planId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: 'groupId 잘못됨' }, { status: 404 })
    const plan = group.plans.find(p => p.plan_id === planId)
    if (!plan) return HttpResponse.json({ message: 'planId 없음' }, { status: 404 })
    try {
      const body = await request.json()
      const { starting_time, ending_time, location, transportation, cost } = body
      if (!starting_time || !ending_time || !location || !transportation || typeof cost !== 'number' || cost <= 0) {
        return HttpResponse.json({ message: '활동 설명 제외 필수 값 누락 발생 또는 cost 오류' }, { status: 400 })
      }
      Object.assign(plan, body)
      return HttpResponse.json({ message: '여행 계획 수정이 완료되었습니다.' })
    } catch (e) {
      return HttpResponse.json({ message: '서버 오류' }, { status: 500 })
    }
  }),
  // Delete plan
  http.delete('/api/groups/:groupId/plans/:planId', ({ params }) => {
    const { groupId, planId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: 'groupId 잘못됨' }, { status: 404 })
    group.plans = group.plans.filter(p => p.plan_id !== planId)
    return HttpResponse.json({ message: '계획 삭제 완료' })
  }),

  // ===== Candidates =====
  http.post('/api/groups/:groupId/candidates', ({ params }) => {
    const { groupId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: 'groupId 잘못됨' }, { status: 404 })
    if (group.candidates.callCnt >= 3) {
      return HttpResponse.json({ message: '재생성 3회 초과' }, { status: 400 })
    }
    group.candidates.callCnt++
    // generate dummy candidate
    const candidatePlanId = generateId('cpl')
    group.candidates.list.push({ candidatePlanId, content: '더미 후보 일정', votes: 0, votedUsers: [] })
    return HttpResponse.json({ message: '후보 생성 완료', callCnt: group.candidates.callCnt })
  }),
  http.get('/api/groups/:groupId/candidates/:candidateId', ({ params }) => {
    const { groupId, candidateId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: 'groupId 잘못됨' }, { status: 404 })
    const found = group.candidates.list.find(c => c.candidatePlanId === candidateId)
    if (!found) return HttpResponse.json({ message: 'candidateId 없음' }, { status: 404 })
    return HttpResponse.json({
      groupId,
      isLeader: true,
      callCnt: group.candidates.callCnt,
      candidatePlans: group.candidates.list.map(c => ({ candidatePlanId: c.candidatePlanId, content: c.content, votes: c.votes, voted: false }))
    })
  }),
  // Vote list summary
  http.get('/api/groups/:groupId/candidates/votes', ({ params, request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const { groupId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: 'groupId 잘못됨' }, { status: 404 })
    const isLeader = group.leaderId === userId
    return HttpResponse.json({
      leaderVoted: group.candidates.list.some(c => c.votedUsers.includes(group.leaderId)),
      isLeader,
      deadline: '2025-11-17',
      candidatePlanList: group.candidates.list.map(c => ({
        candidatePlanId: c.candidatePlanId,
        content: c.content,
        votes: c.votes,
        voted: c.votedUsers.includes(userId)
      }))
    })
  }),
  // Vote or update vote
  http.post('/api/groups/:groupId/candidates/votes', async ({ params, request }) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const { groupId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: 'groupId 잘못됨' }, { status: 404 })
    try {
      const { candidatePlanId } = await request.json()
      const target = group.candidates.list.find(c => c.candidatePlanId === candidatePlanId)
      if (!target) return HttpResponse.json({ message: 'candidatePlanId 잘못됨' }, { status: 404 })
      // Remove previous vote
      group.candidates.list.forEach(c => {
        const idx = c.votedUsers.indexOf(userId)
        if (idx !== -1) {
          c.votedUsers.splice(idx, 1)
          c.votes = Math.max(0, c.votes - 1)
        }
      })
      // Add new vote
      if (!target.votedUsers.includes(userId)) {
        target.votedUsers.push(userId)
        target.votes += 1
      }
      return HttpResponse.json({ message: '투표 수정 완료' })
    } catch (e) {
      return HttpResponse.json({ message: '서버 오류' }, { status: 500 })
    }
  }),

  // ===== Requirements =====
  http.post('/api/groups/:groupId/requirements', async ({ params, request }) => {
    const { groupId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: 'groupId 잘못됨' }, { status: 404 })
    try {
      const body = await request.json()
      const requirementId = generateId('r')
      const member = group.members[0] // simplistic: first member acts as author
      const req = { requirementId, memberId: member.memberId, userId: member.userId, nickname: member.nickname, ...body }
      group.requirements.push(req)
      return HttpResponse.json({ message: '요구사항 생성이 완료되었습니다', requirementId })
    } catch (e) {
      return HttpResponse.json({ message: '서버 오류' }, { status: 500 })
    }
  }),
  http.get('/api/groups/:groupId/requirements', ({ params }) => {
    const { groupId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: 'groupId 잘못됨' }, { status: 404 })
    const totalMembers = group.members.length
    return HttpResponse.json({ totalMembers, requirements: group.requirements })
  }),
  http.put('/api/groups/:groupId/requirements/:requirementId', async ({ params, request }) => {
    const { groupId, requirementId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: 'groupId 잘못됨' }, { status: 404 })
    const req = group.requirements.find(r => r.requirementId === requirementId)
    if (!req) return HttpResponse.json({ message: 'requirementId 없음' }, { status: 404 })
    try {
      const body = await request.json()
      Object.assign(req, body)
      return HttpResponse.json({ message: '요구 사항 수정이 완료되었습니다.' })
    } catch (e) {
      return HttpResponse.json({ message: '서버 오류' }, { status: 500 })
    }
  }),
  http.delete('/api/groups/:groupId/requirements/:requirementId', ({ params }) => {
    const { groupId, requirementId } = params
    const group = groups.find(g => g.groupId === groupId)
    if (!group) return HttpResponse.json({ message: 'groupId 잘못됨' }, { status: 404 })
    group.requirements = group.requirements.filter(r => r.requirementId !== requirementId)
    return HttpResponse.json({ message: '요구사항 삭제 완료' })
  }),
]

