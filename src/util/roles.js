const roles = {
  ADMIN: 'Admin',
  AGENT: 'Agent',
  ACCOUNT_MANAGER: 'Account manager',
  EXTERNAL_REVIEWER: 'External reviewer',
}

export function getRoleName(roleId) {
  if (roles[roleId]) {
    return roles[roleId];
  }

  return roles.AGENT;
}