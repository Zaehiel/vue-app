<template>
  <div class="user-list">
    <div class="user-list__header">
      <input type="checkbox" @click="toggleAllUsers" :checked="isAllSelected">
      <div class="user-list__header-user-col">User</div>
      <div class="user-list__header-permissions-col">Permission</div>
    </div>
    <VirtualList
      v-if="!isLoading"
      style="height: 500px; overflow-y: auto;"
      :data-key="'id'"
      :data-sources="allUsers"
      :data-component="listComponent"
      @tobottom="loadMoreUsers"
    >
      <div slot="footer" class="skeleton-user-item" />
    </VirtualList>
    <div class="skeleton-user-item" v-if="isLoading" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VirtualList from 'vue-virtual-scroll-list';
import UserListItem from './UserListItem/UserListItem';

export default {
  components: {
    VirtualList,
  },
  data() {
    return {
      isLoading: true,
      isLoadingMore: false,
      fetchStep: 500,
      listComponent: UserListItem,
    };
  },
  async mounted() {
   this.fetchMoreUsers();
  },
  methods: {
    ...mapActions([
      'fetchUsers',
      'toggleUserSelection',
      'toggleSelectAllUsers',
    ]),
    async fetchMoreUsers() {
      this.isLoadingMore = true;

      await this.fetchUsers({
        start: this.usersStartIndex,
        step: this.fetchStep,
      });

      this.isLoading = false;
      this.isLoadingMore = false;
    },
    toggleAllUsers() {
      this.toggleSelectAllUsers(!this.isAllSelected);
    },
    loadMoreUsers () {
      if (this.isLoading) {
        return;
      }
      this.fetchMoreUsers();
    }
  },
  computed: {
    ...mapGetters([
      'allUsers',
      'usersStartIndex',
      'selectedUsersCount',
    ]),
    isAllSelected() {
      return this.allUsers.length > 0
              && this.allUsers.length === this.selectedUsersCount;
    }
  }
}
</script>

<style lang="scss">
.user-list {
  &__header {
    display: flex;
    align-items: center;
    padding: 4px 16px;
    color: #718096;
    font-size: 12px;
    line-height: 14px;

    &-user-col {
      width: 100%;
      max-width: calc(42% + 56px);
      margin-right: 24px;
      padding-left: 12px;
    }
  }
  .user-item {
    margin-bottom: 4px;
  }
}

.skeleton-user-item {
  height: 64px;
  border-radius: 4px;
  overflow: hiddern;
  background-image: linear-gradient(90deg, #F7FAFC 0px, #FFF 40px, #F7FAFC 80px);
  animation: shine .8s infinite ease;
}

@media only screen and (max-width: 719px) {
  .user-list__header-user-col {
    max-width: calc(36% + 56px);
  }
}

@media only screen and (max-width: 600px) {
  .user-list__header-user-col {
    max-width: calc(20% + 44px);
  }
}
</style>