<template>
  <div id="app" class="page">
    <div class="header">
      <div class="header__title">Account users</div>
      <div class="header__actions">
        <label for="search" class="input-wrapper input-wrapper--input-with-icon">
          <IconZoom />
          <input class="klaus-input" name="search" type="text" placeholder="Search">
        </label>
        <button class="klaus-button klaus-button--primary">Connect users</button>
      </div>
    </div>
    <div class="content">
      <div class="content__header">
        <div class="content__header-text">{{ selectedUsersText }}</div>
        <div class="content__header-actions">
          <button class="klaus-button">
            <IconPen />
            <span class="klaus-button__text">
              Edit
            </span>
          </button>
          <button class="klaus-button">
            <IconTrash />
            <span class="klaus-button__text">
              Delete
            </span>
          </button>
        </div>
      </div>
      <UserList />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserList from './components/UserList/UserList';
import IconPen from './components/Icons/Pen';
import IconTrash from './components/Icons/Trash';
import IconZoom from './components/Icons/Zoom';

export default {
  components: {
    UserList,
    IconPen,
    IconTrash,
    IconZoom,
  },
  computed: {
    ...mapGetters([
      'selectedUsersCount',
    ]),
    selectedUsersText() {
      if (this.selectedUsersCount === 1) {
        return '1 user selected'
      }

      return `${this.selectedUsersCount} users selected`;
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/input.scss';
@import './assets/css/button.scss';
@import './assets/css/animations.scss';
#app {
 font-family: Helvetica, Arial, sans-serif;
}

html,
body {
  height: 100%;
  background: #EDF2F7;
  color: #1A202C;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 18px;

  &__title {
    font-size: 18px;
    text-align: left; 
    white-space: nowrap;
  }

  &__actions {
    display: flex;
    margin-left: auto;

    button {
      margin-left: 12px;
    }
  }

}

.page {
  max-width: 780px;
  height: 100%;
  padding: 32px;
  margin: 0 auto;
}

.content {
  background: white;
  border-radius: 8px;
  padding: 16px;

  &__header {
    display: flex;
    align-items: center;
    padding: 16px;

    &-text {
      font-size: 16px;
    }

    &-actions {
      display: flex;
      margin-left: 24px;

      button {
        margin-right: 8px;
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .content {
    padding: 8px;
  }

  .header {
    flex-direction: column;
    flex-wrap: wrap;
    
    &__title {
      align-self: flex-start;
      padding-bottom: 8px;
    }

    &__actions {
      .input-wrapper,
      .klaus-button {
        width: 50%;

        .klaus-input {
          width: 100%;
        }
      }
    }
  }
}
</style>
