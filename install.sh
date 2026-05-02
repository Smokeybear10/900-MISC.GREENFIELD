#!/usr/bin/env bash
# Install the greenfield framework into ~/.claude/
# Idempotent: safe to run multiple times.
set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
CLAUDE_DIR="$HOME/.claude"
COMMANDS_DIR="$CLAUDE_DIR/commands"
GLOBAL_CLAUDE="$CLAUDE_DIR/CLAUDE.md"
SNIPPET="$REPO_DIR/.claude/CLAUDE.md.snippet"
COMMAND_SRC="$REPO_DIR/.claude/commands/greenfield.md"
COMMAND_DST="$COMMANDS_DIR/greenfield.md"
MARKER_BEGIN="<!-- greenfield-framework:begin -->"
MARKER_END="<!-- greenfield-framework:end -->"

echo "Installing greenfield framework from: $REPO_DIR"
echo ""

mkdir -p "$COMMANDS_DIR"

# 1. Symlink /greenfield slash command into ~/.claude/commands/
if [ -L "$COMMAND_DST" ] && [ "$(readlink "$COMMAND_DST")" = "$COMMAND_SRC" ]; then
  echo "  /greenfield: already symlinked"
else
  if [ -e "$COMMAND_DST" ]; then
    backup="$COMMAND_DST.bak.$(date +%s)"
    mv "$COMMAND_DST" "$backup"
    echo "  /greenfield: existing file backed up to $backup"
  fi
  ln -sf "$COMMAND_SRC" "$COMMAND_DST"
  echo "  /greenfield: symlinked → $COMMAND_SRC"
fi

# 2. Append snippet to global CLAUDE.md (idempotent via markers)
touch "$GLOBAL_CLAUDE"
if grep -qF "$MARKER_BEGIN" "$GLOBAL_CLAUDE"; then
  echo "  CLAUDE.md: snippet already present (skipping)"
else
  {
    printf '\n%s\n' "$MARKER_BEGIN"
    cat "$SNIPPET"
    printf '%s\n' "$MARKER_END"
  } >> "$GLOBAL_CLAUDE"
  echo "  CLAUDE.md: appended greenfield section to $GLOBAL_CLAUDE"
fi

echo ""
echo "Done. Type /greenfield in any new project to start the workflow."
echo ""
echo "Note: gstack must also be installed for the underlying skills"
echo "(/office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review)."
