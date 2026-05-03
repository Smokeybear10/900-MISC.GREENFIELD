#!/usr/bin/env bash
# Install the GREEN framework into ~/.claude/
# Idempotent: safe to run multiple times.
# Symlinks every .md in .claude/commands/ into ~/.claude/commands/.
# Syncs RULES.md content into ~/.claude/CLAUDE.md (between markers).
# Appends the /GREEN snippet to ~/.claude/CLAUDE.md (between markers).
set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
CLAUDE_DIR="$HOME/.claude"
COMMANDS_DIR="$CLAUDE_DIR/commands"
GLOBAL_CLAUDE="$CLAUDE_DIR/CLAUDE.md"
SNIPPET="$REPO_DIR/.claude/CLAUDE.md.snippet"
RULES_SRC="$REPO_DIR/RULES.md"
COMMANDS_SRC_DIR="$REPO_DIR/.claude/commands"
GREEN_BEGIN="<!-- greenfield-framework:begin -->"
GREEN_END="<!-- greenfield-framework:end -->"
RULES_BEGIN="<!-- rules:begin -->"
RULES_END="<!-- rules:end -->"

echo "Installing GREEN framework from: $REPO_DIR"
echo ""

mkdir -p "$COMMANDS_DIR"

# 1. Symlink every command in .claude/commands/ into ~/.claude/commands/
shopt -s nullglob
for src in "$COMMANDS_SRC_DIR"/*.md; do
  filename=$(basename "$src")
  cmdname="${filename%.md}"
  dst="$COMMANDS_DIR/$filename"

  if [ -L "$dst" ] && [ "$(readlink "$dst")" = "$src" ]; then
    echo "  /$cmdname: already symlinked"
  else
    if [ -e "$dst" ]; then
      backup="$dst.bak.$(date +%s)"
      mv "$dst" "$backup"
      echo "  /$cmdname: existing file backed up to $backup"
    fi
    ln -sf "$src" "$dst"
    echo "  /$cmdname: symlinked → $src"
  fi
done

touch "$GLOBAL_CLAUDE"

# 2. Sync RULES.md content into ~/.claude/CLAUDE.md (between rules markers)
if [ -f "$RULES_SRC" ]; then
  if grep -qF "$RULES_BEGIN" "$GLOBAL_CLAUDE"; then
    awk -v rfile="$RULES_SRC" -v begin="$RULES_BEGIN" -v end="$RULES_END" '
      $0 == begin {
        print
        while ((getline line < rfile) > 0) print line
        close(rfile)
        skip = 1
        next
      }
      $0 == end { skip = 0; print; next }
      !skip { print }
    ' "$GLOBAL_CLAUDE" > "$GLOBAL_CLAUDE.tmp" && mv "$GLOBAL_CLAUDE.tmp" "$GLOBAL_CLAUDE"
    echo "  CLAUDE.md: rules section synced from RULES.md"
  else
    {
      printf '%s\n' "$RULES_BEGIN"
      cat "$RULES_SRC"
      printf '%s\n\n' "$RULES_END"
      cat "$GLOBAL_CLAUDE"
    } > "$GLOBAL_CLAUDE.tmp"
    mv "$GLOBAL_CLAUDE.tmp" "$GLOBAL_CLAUDE"
    echo "  CLAUDE.md: rules section added (prepended)"
  fi
fi

# 3. Sync /GREEN snippet into ~/.claude/CLAUDE.md (between greenfield-framework markers)
if [ -f "$SNIPPET" ]; then
  if grep -qF "$GREEN_BEGIN" "$GLOBAL_CLAUDE"; then
    awk -v rfile="$SNIPPET" -v begin="$GREEN_BEGIN" -v end="$GREEN_END" '
      $0 == begin {
        print
        while ((getline line < rfile) > 0) print line
        close(rfile)
        skip = 1
        next
      }
      $0 == end { skip = 0; print; next }
      !skip { print }
    ' "$GLOBAL_CLAUDE" > "$GLOBAL_CLAUDE.tmp" && mv "$GLOBAL_CLAUDE.tmp" "$GLOBAL_CLAUDE"
    echo "  CLAUDE.md: /GREEN section synced from snippet"
  else
    {
      printf '\n%s\n' "$GREEN_BEGIN"
      cat "$SNIPPET"
      printf '%s\n' "$GREEN_END"
    } >> "$GLOBAL_CLAUDE"
    echo "  CLAUDE.md: /GREEN section appended"
  fi
fi

echo ""
echo "Done."
echo ""
echo "Note: gstack must also be installed for the underlying skills"
echo "(/office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review)."
