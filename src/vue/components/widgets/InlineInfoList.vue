<template>
    <ul v-if="items.length"
        class="inline-info-list text-1">
        <li v-for="item in items">
            <i :class="`${item.faIcon}`"/>
            <span v-html="item.value"/>
        </li>
    </ul>
</template>

<script setup>
const props = defineProps({
    items: Array
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

ul.inline-info-list {
    display: flex;
    list-style: none;
    padding: 0 0 0 5px;

    li {
        color: lighten($nav-background, 10%);
        &:not(:last-child) {
            margin-right: 10px;
        }

        &:not(:last-child)::after {
            content: "𐄁";
            opacity: 0.4;
            margin-left: 9px;
        }
    }

    i {
        margin-right: 5px;
        text-align: center;
    }

    span {
        color: $light-7;
    }
}

ul.inline-info-list {
    @include media-breakpoint-down(xl) {
        flex-direction: column;
        padding: 0;
        li {
            margin-right: 0!important;
            margin-bottom: 7px;
            display: inline;

            &::after {
                display: none!important;
            }
        }

        i {
            min-width: 18px;
            text-align: center;
        }
    }

    @include media-breakpoint-down(lg) {
        li {
            margin-bottom: 5px;
        }
    }
}
</style>