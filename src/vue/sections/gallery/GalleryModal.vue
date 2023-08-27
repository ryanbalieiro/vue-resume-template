<template>
    <!-- Bootstrap Modal -->
    <div class="modal modal-xl fade" :id="UNIQUE_ID" tabindex="-1" :aria-labelledby="`${UNIQUE_ID}-label`" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <!-- Modal Content -->
            <div class="modal-content">
                <!-- Close Button -->
                <button class="close-button" data-bs-dismiss="modal" aria-label="Close">
                    <i class="fa fa-close"></i>
                </button>

                <!-- Body -->
                <div v-if="props.project" class="modal-body py-5 py-lg-4">
                    <!-- Content Row -->
                    <div class="row text-center text-lg-start p-2 p-md-4">
                        <!-- Image Column -->
                        <div class="col-12 col-lg-4 pe-0 pe-lg-4">
                            <ImageView  :src="props.project['logoUrl']"
                                        :alt="props.project['title']"
                                        :spinner-enabled="true"
                                        class="img-fluid logo my-auto my-lg-0 mb-3"/>
                        </div>

                        <!-- Texts Column -->
                        <div class="col-12 col-lg-8">
                            <!-- Title -->
                            <h1 class="fw-bold mb-3" v-html="props.project['title']"/>

                            <!-- Tags -->
                            <div class="text-4">
                                <i class="fa fa-tag me-1"/>
                                {{ data.getString('tags') }}:
                                <Tags :items="props.project['locales']['tags']" :item-class="'bg-primary'" class="d-inline ms-2"/>
                            </div>

                            <!-- About SubSection -->
                            <div class="modal-subsection">
                                <!-- Title -->
                                <h5 class="d-none d-lg-inline-block fw-bold">
                                    <i class="fa fa-file me-2"/>
                                    <span class="ms-1">{{ data.getString('aboutProject') }}</span>
                                </h5>

                                <!-- Content -->
                                <p v-html="props.project['locales']['description']" class="text-3 text-light-7"/>
                            </div>

                            <!-- Links SubSection -->
                            <div class="modal-subsection">
                                <!-- Title -->
                                <h5 class="d-inline-block fw-bold">
                                    <i class="fa fa-external-link me-2" />
                                    <span class="ms-1">{{ data.getString('whereToFind') }}</span>
                                </h5>

                                <!-- Content -->
                                <p v-html="data.getString('whereToFindDescription').replace('${project}', `<strong>${props.project['title']}</strong>`)"
                                   class="text-3 text-light-7"/>

                                <!-- Social Links -->
                                <SocialLinks :items="props.project['links']"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import {useData} from "../../../composables/data.js"
import Modal from '/node_modules/bootstrap/js/src/modal'
import ImageView from "../../widgets/ImageView.vue"
import Tags from "../../widgets/Tags.vue"
import SocialLinks from "../../widgets/SocialLinks.vue"

/**
 * @property {Object} project
 */
const props = defineProps({
    project: Object
})

const data = useData()

/**
 * @const
 * @type {string}
 */
const UNIQUE_ID = 'gallery-modal'

/**
 * @type {Modal|null}
 */
let bsModal = null

/**
 * @public
 */
const display = () => {
    if(!bsModal) {
        return
    }

    bsModal.show()
}

/**
 * @private
 */
onMounted(() => {
    const elModal = document.getElementById(UNIQUE_ID)
    if(elModal) {
        bsModal = new Modal(elModal, {})
    }
})

defineExpose({
    display
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.modal-content {
    background-color: $light-1;
}

.close-button {
    position: absolute;
    right: 20px;
    top: 10px;

    z-index: 99;
    padding: 0;
    margin: 0;
    font-size: 1.7rem;

    background-color: transparent;
    border-color: transparent;
    color:$light-4;

    &:hover {
        color: $primary;
    }
}

.modal-subsection {
    @include generate-dynamic-styles-with-hash((
        xxxl: (margin-top: 35px),
        lg:   (margin-top: 30px),
        sm:   (margin-top: 25px)
    ))
}

.logo {
    @include generate-dynamic-styles-with-hash((
        xxxl: (max-width: 100%),
        lg:   (max-width: max(150px, min(20vw, 100%)), margin-bottom: 80px),
        sm:   (max-width: max(130px, 30vw))
    ));

    margin: auto;
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 27.5%;
}

</style>