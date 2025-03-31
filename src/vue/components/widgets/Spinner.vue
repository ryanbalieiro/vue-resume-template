<template>
    <!-- Base 64 Spinner -->
    <img alt="Loading..."
         class="resume-spinner-widget"
         :class="props.class"
         src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvOyIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIzMiIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2U9IiM1NDUxNTEiIHN0cm9rZS1kYXNoYXJyYXk9IjUwLjI2NTQ4MjQ1NzQzNjY5IDUwLjI2NTQ4MjQ1NzQzNjY5IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIga2V5VGltZXM9IjA7MSIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCI+PC9hbmltYXRlVHJhbnNmb3JtPgo8L2NpcmNsZT4KPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMjMiIHN0cm9rZS13aWR0aD0iOCIgc3Ryb2tlPSIjYzNjM2M1IiBzdHJva2UtZGFzaGFycmF5PSIzNi4xMjgzMTU1MTYyODI2MiAzNi4xMjgzMTU1MTYyODI2MiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjM2LjEyODMxNTUxNjI4MjYyIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIga2V5VGltZXM9IjA7MSIgdmFsdWVzPSIwIDUwIDUwOy0zNjAgNTAgNTAiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+CjwhLS0gW2xkaW9dIGdlbmVyYXRlZCBieSBodHRwczovL2xvYWRpbmcuaW8vIC0tPjwvc3ZnPg==" />
</template>

<script setup>
const props = defineProps({
    class: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

img.resume-spinner-widget {
    @include generate-dynamic-styles-with-hash((
        xxxl:   (max-width: 200px,  max-height:200px),
        md:     (max-width: 130px,  max-height:130px),
        sm:     (max-width: 90px,   max-height:90px),
    ));

    margin: 0 auto;
    width: 50%;
    height: 50%;
}
</style>