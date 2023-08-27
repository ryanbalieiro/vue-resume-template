<template>
    <div class="row pt-1 pt-lg-3">
        <div v-for="item in props.items" class="col-12 col-md-6">
            <!-- Item -->
            <div class="contact-item">
                <!-- Item Logo -->
                <div class="contact-item-logo">
                    <i :class="item['faIcon']"/>
                </div>

                <!-- Item Texts -->
                <div class="contact-item-content">
                    <!-- Item Title -->
                    <h5 class="contact-item-title">{{ data.getString(item['id']) }}</h5>

                    <!-- Item Link... -->
                    <a v-if="item['href']" v-html="_getItemLabel(item)" :href="item['href']" class="text-3 muted" target="_blank"/>

                    <!-- Fallback (if there's not a link...) -->
                    <p v-else v-html="_getItemLabel(item)" class="text-3 text-muted mb-0"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useData} from "../../../composables/data.js"

/**
 * @property {Object[]} items
 */

const props = defineProps({
    items: Array
})

const data = useData()

/**
 * @param {Object} item
 * @return {String}
 * @private
 */
const _getItemLabel = (item) => {
    return item['value'] || item['valueShort']
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.contact-item {
    @include generate-dynamic-styles-with-hash((
        xxxl: (height:85px),
        xl:   (height:75px),
        lg:   (height:65px),
        md:   (height:60px),
        sm:   (height:55px)
    ));

    display: flex;
    padding-bottom: 0.5rem;
    text-align: left;
}

.contact-item-logo {
    --font-size:1.5rem;
    @include media-breakpoint-down(xl) {--font-size: 1.4rem;}
    @include media-breakpoint-down(lg) {--font-size: 1.2rem;}
    @include media-breakpoint-down(md) {--font-size: 1.1rem;}
    @include media-breakpoint-down(sm) {--font-size: 1rem;}

    --dimensions:calc(var(--font-size) * 2.4);

    min-width: var(--dimensions);
    width: var(--dimensions);
    height: var(--dimensions);
    font-size: var(--font-size);

    display: inline-flex;
    justify-content: center;
    align-items: center;

    margin-top: 0;
    margin-right: 1rem;

    opacity: 0.9;
    border-radius: 30%;

    color: $white;
    background-color: darken($primary, 10%);
}

.contact-item-content {
    @include generate-dynamic-styles-with-hash((
        xxxl: (margin-top:5px),
        lg:  (margin-top:1px)
    ));

    display: flex;
    flex-direction: column;
}

.contact-item-title {
    @include generate-dynamic-styles-with-hash((
        xxxl: (margin-bottom: 0.25rem),
        lg:  (margin-bottom: 0.2rem)
    ));

    font-weight: bold;
}
</style>