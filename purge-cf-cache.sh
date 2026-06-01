#!/bin/bash
# ============================================================
#  purge-cf-cache.sh
#  ล้าง Cloudflare Edge Cache หลัง deploy ทุกครั้ง
#  ใช้งาน: bash purge-cf-cache.sh
# ============================================================

# ────────────────────────────────────────────────
# 1.  ตั้งค่า Environment Variables ก่อนรัน
#     วิธีที่ 1  →  export ก่อน:
#       export CF_ZONE_ID="your_zone_id"
#       export CF_API_TOKEN="your_api_token"
#     วิธีที่ 2  →  ใส่ใน Cloudflare Pages: Settings > Environment variables
# ────────────────────────────────────────────────

CF_ZONE_ID="${CF_ZONE_ID:?ERROR: CF_ZONE_ID is not set}"
CF_API_TOKEN="${CF_API_TOKEN:?ERROR: CF_API_TOKEN is not set}"

# หา Zone ID ได้จาก: Cloudflare Dashboard → เลือก Domain → Overview → ขวาล่าง
# หา API Token ได้จาก: My Profile → API Tokens → Create Token → "Cache Purge" template

echo "🔥 Purging Cloudflare cache for zone: $CF_ZONE_ID ..."

RESPONSE=$(curl -s -X POST \
  "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything": true}')

# ────────────────────────────────────────────────
# ตรวจผลลัพธ์
# ────────────────────────────────────────────────
SUCCESS=$(echo "$RESPONSE" | grep -o '"success":true')

if [ -n "$SUCCESS" ]; then
  echo "✅ Cache purged successfully!"
  echo "   Cloudflare Edge nodes จะ refetch ไฟล์ใหม่ทั้งหมดในเวลาไม่กี่วินาที"
else
  echo "❌ Cache purge FAILED. Response:"
  echo "$RESPONSE"
  exit 1
fi

# ────────────────────────────────────────────────
# Optional: ล้างแค่บางไฟล์แทน purge_everything
# (ใช้เมื่อแก้เฉพาะบาง file เพื่อไม่ให้ผู้ใช้โหลดซ้ำทั้งหมด)
# ────────────────────────────────────────────────
# DOMAIN="https://savor-happiness-guide.pages.dev"
# RESPONSE=$(curl -s -X POST \
#   "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache" \
#   -H "Authorization: Bearer ${CF_API_TOKEN}" \
#   -H "Content-Type: application/json" \
#   --data "{
#     \"files\": [
#       \"${DOMAIN}/index.html\",
#       \"${DOMAIN}/style.css\",
#       \"${DOMAIN}/script.js\",
#       \"${DOMAIN}/auth.js\",
#       \"${DOMAIN}/auth-ui.js\"
#     ]
#   }")
