<template>
  <div
    class="user-item"
    :class="{
      'user-item--selected': source.isSelected,
    }"
    @click="changeHandler"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div v-if="source.isSelected" class="user-item__highlight" />
    <div class="user-item__selector">
      <input
        type="checkbox"
        :checked="source.isSelected"
      >
    </div>
    <div class="user-item__avatar">
      <img :src="source.avatar" alt="users avatar">
    </div>
    <div class="user-item__information">
      <div class="user-item__name">{{ source.name }}</div>
      <div class="user-item__contact">{{ source.email }}</div>
    </div>
    <div class="user-item__permission-level">
      <Badge :role="source.role" />
    </div>
    <div v-if="isHovering" class="user-item__actions">
      <button class="klaus-button">
        <IconPen />
        <span class="klaus-button__text">
          Edit
        </span>
      </button>
      <button class="klaus-button" @click="deleteHandler"><IconTrash /></button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Badge from '../../Badge/Badge';
import IconPen from '../../../components/Icons/Pen';
import IconTrash from '../../../components/Icons/Trash';

export default {
  components: {
    Badge,
    IconPen,
    IconTrash,
  },
  data() {
    return {
      checked: false,
      isHovering: false,
    }
  },
  props: {
    source: {
      type: Object,
      default() {
        return {
          id: {
            type: Number,
          },
          avatar: {
            type: String,
            default: '',
          },
          name: {
            type: String,
            default: '',
          },
          email: {
            type: String,
            default: '',
          },
          role: {
            type: String,
          },
          isSelected: {
            type: Boolean,
            default: false,
          },
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'toggleUserSelection',
      'deleteUser',
    ]),
    changeHandler() {
      this.toggleUserSelection(this.source.id);
    },
    deleteHandler() {
      this.deleteUser(this.source.id);
    }
  }
}
</script>

<style lang="scss">
.user-item {
  display: flex;
  align-items: center;
  background: #FFF;
  border-radius: 4px;
  padding: 14px 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &:hover,
  &--selected {
    background: #F7FAFC;
  }

  &__highlight {
    background: #475DE5;
    width: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  &__avatar {
    flex: 0 0 32px;
    height: 32px;
    margin: 0 12px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;

  }

  &__name {
    font-size: 14px;
    color: #1A202C;
  }
  
  &__contact {
    font-size: 14px;
    color: #718096;
  }

  &__information {
    margin-right: 24px;
    width: 100%;
    max-width: 42%;
  }

  &__name,
  &__contact {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 18px;
  }

  &__actions {
    margin-left: auto;
    display: flex;

    button {
      margin-left: 4px;
    }
  }
}

@media only screen and (max-width: 719px) {
  .user-item {
    &__information {
      max-width: 36%;
    }
  }
}

@media only screen and (max-width: 600px) {
  .user-item {
    &__information {
      max-width: 20%;
    }

    &__information {
      margin-right: 12px;
    }
  }
}
</style>