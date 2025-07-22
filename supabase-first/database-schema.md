# 📋 **Supabase 테이블 구조 (Table Editor용)**

## 🎯 **간단한 접근법**

**Table Editor에서 직접 생성하세요!**

---

## 1️⃣ **profiles** 테이블

| 컬럼명 | 타입 | 기본값 | NULL 허용 | 설명 |
|--------|------|--------|-----------|------|
| `id` | `uuid` | `gen_random_uuid()` | ❌ | 기본키 |
| `user_id` | `uuid` | - | ❌ | auth.users 참조 (UNIQUE) |
| `display_name` | `text` | - | ❌ | 표시 이름 |
| `avatar_url` | `text` | - | ✅ | 프로필 이미지 |
| `bio` | `text` | - | ✅ | 자기소개 |
| `is_available` | `boolean` | `false` | ❌ | 퀸 여부 |
| `created_at` | `timestamptz` | `now()` | ❌ | 생성일 |
| `updated_at` | `timestamptz` | `now()` | ❌ | 수정일 |

---

## 2️⃣ **appointments** 테이블

| 컬럼명 | 타입 | 기본값 | NULL 허용 | 설명 |
|--------|------|--------|-----------|------|
| `id` | `uuid` | `gen_random_uuid()` | ❌ | 기본키 |
| `requester_id` | `uuid` | - | ❌ | 요청자 ID |
| `appointment_date` | `date` | - | ❌ | 약속 날짜 |
| `appointment_time` | `time` | - | ❌ | 약속 시간 |
| `title` | `text` | - | ❌ | 약속 제목 |
| `description` | `text` | - | ✅ | 약속 설명 |
| `location` | `text` | - | ✅ | 약속 장소 |
| `status` | `text` | `'pending'` | ❌ | 상태 (pending/approved/rejected/cancelled) |
| `created_at` | `timestamptz` | `now()` | ❌ | 생성일 |
| `updated_at` | `timestamptz` | `now()` | ❌ | 수정일 |

---

## 🔒 **RLS 정책** (나중에 설정)

### profiles 테이블
- ✅ **조회**: 모든 사용자 가능
- ✅ **생성/수정**: 본인만 가능

### appointments 테이블  
- ✅ **조회**: 요청자 또는 퀸만 가능
- ✅ **생성**: 로그인한 사용자만 가능
- ✅ **수정**: 퀸만 가능

---

## 🚀 **초간단 플로우**

1. **일반 사용자**: 약속 요청 생성
2. **퀸 (`yerak213@naver.com`)**: 승인/거절
3. **끝!** 🎉

더 간단해졌어요! 😊 