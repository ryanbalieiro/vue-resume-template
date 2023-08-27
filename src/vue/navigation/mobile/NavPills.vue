<template>
    <!-- Nav Pills (Category Navigation) -->
    <div v-if="props.sections && props.sections.length >= 2" class="nav-pills">
        <!-- Nav Pill -->
        <button v-for="section in props.sections" :class="_getNavPillClass(section)" @click="_onLinkClicked(section)">
            <!-- Button Content -->
            <i class="nav-pill-icon" :class="section['faIcon']"/>
            <span class="d-none d-sm-inline">{{data.getString(section['id'])}}</span>
        </button>
    </div>
</template>

<script setup>
import {useNavigation} from "../../../composables/navigation.js"
import {useData} from "../../../composables/data.js"

/**
 * @property {Object[]} sections
 */
const props = defineProps({
    sections:Array
})

const data = useData()
const navigation = useNavigation()

const emit = defineEmits(['linkClicked'])

/**
 * @param {Object} section
 * @private
 */
const _getNavPillClass = (section) => {
    return `nav-item ${navigation.isSectionActive(section['id']) ? 'nav-item-selected' : ''}`
}

/**
 * @param {Object} section
 * @private
 */
const _onLinkClicked = (section) => {
    emit('linkClicked', section)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.nav-item {
    @include generate-dynamic-styles-with-hash((
        xxxl: (font-size:0.9rem, border-width:2px, min-height: min(50px, 10vh)),
        sm:   (font-size:0.9rem, border-width:2px, min-height: min(45px, 7.5vh)),
    ));

    flex:1;
    padding: 0.5rem 0.5rem;
    font-family: $headings-font-family;
    text-transform: uppercase;

    border:none;
    border-top: 2px solid lighten($nav-background-color, 5%);

    background-color: darken($nav-background-color, 2%);
    color: lighten($nav-item-grayed-out-color, 10%);
}

.nav-pill-icon {
    @include generate-dynamic-styles-with-hash((
        xxxl: (width:30px),
        sm:   (width:25px),
    ));

    color: $nav-item-grayed-out-color;
}

.nav-item:hover, .nav-item-selected {
    color: $white;
    .nav-pill-icon {
        color: $white;
    }
}

.nav-item-selected {
    border-color: lighten($primary, 20%);
    background-color: lighten($nav-background-color, 2%);
}
</style>