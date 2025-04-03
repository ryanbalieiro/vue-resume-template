<template>
    <div class="filter-tabs">
        <!-- Bootstrap's Button Group -->
        <div class="btn-group"
             role="group">

            <!-- Filter Items -->
            <button v-for="category in props.categories"
                    type="button"
                    class="btn btn-light text-2"
                    :class="{active:_isItemSelected(category)}"
                    @click="_selectItem(category)">
                <!-- Item Label -->
                <span>{{category.label}}</span>
                <span class="ms-1 d-none d-md-inline">({{ category.count }})</span>
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    categories: Array,
    selectedCategoryId: String
})

const emit = defineEmits(['select'])

const _isItemSelected = (category) => {
    return props.selectedCategoryId === category.id
}

const _selectItem = (category) => {
    emit('select', category.id)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.btn-group {
    display: inline-flex;
    width: 100%;
    max-width: 1000px;
    @include media-breakpoint-down(xxl) {
        max-width: 800px;
    }
}

button.btn {
    @include generate-dynamic-styles-with-hash((
        xxxl: (padding: 0.3rem 2rem),
        sm: (padding: 0.3rem 0)
    ));

    border-radius: 30px;
    border-width: 2px;
    min-width: 25%;
    outline: none !important;
    box-shadow: none !important;
    border-color: $default-section-background!important;
    background-color: darken($default-section-background, 2%);
    color: $light-7;
    transition: 0.1s background-color ease-out;

    @include media-breakpoint-down(md) {
        border-width: 1px;
        min-width: 15%;
    }

    &:hover {
        background-color: darken($default-section-background, 5%);
        color: black;
    }

    &:focus, &:active {
        background-color: darken($default-section-background, 7%);
        color: black;
    }

    &.active {
        background-color: $primary;
        color: $light!important;
        opacity: 1;
    }
}
</style>