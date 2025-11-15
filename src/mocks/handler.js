// src/mocks/handler.js
// MSW handlers implementing the provisional backend API spec in apiList.txt
import { http, HttpResponse } from 'msw'

// In-memory stores (reset on page reload)
let users = [
  { userId: '1', email: 'alice@example.com', password: 'P@ssw0rd!', nickname: '앨리스' },
]

let groups = []

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
        members: [leader.userId]
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
    const memberGroups = groups.filter(g => g.members.includes(userId))
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
]

