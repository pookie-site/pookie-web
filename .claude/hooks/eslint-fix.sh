#!/usr/bin/env bash
# Auto-fix the file Claude just edited. Never blocks the edit.
file=$(node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).tool_input?.file_path??""))')
case "$file" in
  *.vue|*.ts|*.mts|*.js|*.mjs|*.cjs)
    cd "$CLAUDE_PROJECT_DIR" && pnpm exec eslint --fix --no-warn-ignored "$file" >/dev/null 2>&1
    ;;
esac
exit 0
