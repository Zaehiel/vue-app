<template>
  <div class="badge" :class="`badge--${role}`">
    {{ roleName }}
  </div>
</template>

<script>
import { getRoleName } from '../../util/roles';

export default {
  data() {
    return {
      checked: false,
    }
  },
  props: {
    role: {
      type: String,
      default: '',
    }
  },
  components: {
  },
  computed: {
    roleName() {
      return getRoleName(this.role);
    },
  }
}
</script>

<style lang="scss">
.badge {
  font-size: 12px;
  border-radius: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 4px 8px;

  &--ADMIN {
    color: #574195;
    background: #EFE2FE;
  }

  &--AGENT {
    color: #2C5282;
    background: #C8E7F9;
  }

  &--ACCOUNT_MANAGER {
    color: #922B6C;
    background: #FEDDE6;
  }

  &--EXTERNAL_REVIEWER {
    color: #91472C;
    background: #FEEBC8;
  }

}
</style>
