export default {
  extends: ['@commitlint/config-conventional'],
  // release commits made by semantic-release carry long generated notes
  ignores: [(message) => message.startsWith('chore(release):')],
};
