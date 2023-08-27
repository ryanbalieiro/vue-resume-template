<template>
    <!-- Profile Card -->
    <div class="nav-profile-card">
        <!-- Avatar -->
        <ImageView :src="props.profileData['profilePictureUrl']"
                   :alt="props.profileData['name']"
                   class="img-pfp"/>

        <!-- Name -->
        <h4 class="nav-profile-card-title lead-2">{{ props.profileData['name'] }}</h4>

        <!-- Role -->
        <h6 class="nav-profile-card-subtitle text-4 mb-1">{{ props.profileData['locales']['role'] }}</h6>
    </div>
</template>

<script setup>
import ImageView from "../../widgets/ImageView.vue"

/**
 * @property {Object} profileData
 * @property {String} name
 * @property {String} role
 */
const props = defineProps({
    profileData: Object
})

</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.nav-profile-card {
    @include generate-dynamic-styles-with-hash((
        xxxl: (padding: 1.5rem),
        lg: (padding: 2rem),
        md: (padding: 1.5rem)
    ));

    @media screen and (max-height: 500px) {
        padding: 1.25rem;
    }

    text-align: center;
    background-color: $nav-background-color;
}

.img-pfp {
    --max-height:clamp(140px, 21.5vh, 170px);
    --border-width:6px;

    @include media-breakpoint-down(lg) {
        --max-height:140px;
    }

    @include media-breakpoint-down(sm) {
        --max-height: min(110px, 19.5vh);
        --border-width: 4px;
    }

    min-width: calc(var(--max-height)/2);
    min-height: calc(var(--max-height)/2);
    width: var(--max-height);
    height: var(--max-height);

    border: var(--border-width) solid adjust-color(lighten($nav-background-color, 32%), $alpha:-0.85);
    border-radius: 50%;
}

.nav-profile-card-title {
    margin-top:1rem;
    text-transform: uppercase;
    letter-spacing: 0.1px;
    color: $white;
}

.nav-profile-card-subtitle {
    font-family: $custom-subheadings-font-family;
    color: $light-5;
}
</style>