<script lang="ts">
    import { currentPanelId } from 'stores/app/main';
    import { quadIn } from 'svelte/easing';
    import { draw } from 'svelte/transition';
    import { PanelTypes } from 'types/app/main';
    import { switchPanel } from 'utilities/app/main';
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={() => switchPanel(PanelTypes.Marketplace)}
    ><defs
        ><linearGradient
            id="MARKETPLACE"
            gradientUnits="userSpaceOnUse"
        /><linearGradient
            id="marketplace"
            x1="47"
            y1="9.6"
            x2="1"
            y2="38.4"
            href="#MARKETPLACE"
            ><stop stop-color="#b98bff" /><stop
                offset="1"
                stop-color="#710fff"
            /></linearGradient
        ></defs
    ><style>
        .marketplace {
            fill: url(#marketplace);
            stroke-width: 0;
        }
    </style><path
        in:draw={{ duration: 1000, easing: quadIn }}
        class={$currentPanelId == 3 ? 'marketplace' : ''}
        d="m27.4 24.3h-6.8q-0.7 0-1.2-0.5-0.5-0.5-0.5-1.2 0-0.7 0.5-1.2 0.5-0.5 1.2-0.5h6.8q0.7 0 1.2 0.5 0.5 0.5 0.5 1.2 0 0.7-0.5 1.2-0.5 0.5-1.2 0.5zm16.4-8q-0.5-0.5-1.2-0.5h-37.2q-0.7 0-1.2 0.5-0.5 0.6-0.5 1.2v25.4q0 0.7 0.5 1.2 0.5 0.5 1.2 0.5h37.2q0.7 0 1.2-0.5 0.5-0.5 0.5-1.2v-25.4q0-0.6-0.5-1.2zm1.7-11.8q-0.5-0.5-1.2-0.5h-40.6q-0.7 0-1.2 0.5-0.5 0.5-0.5 1.2v6.8q0 0.6 0.5 1.2 0.5 0.5 1.2 0.5h40.6q0.7 0 1.2-0.5 0.5-0.6 0.5-1.2v-6.8q0-0.7-0.5-1.2z"
    /></svg
>

<style>
    svg {
        fill: none;
        stroke: var(--svg_stroke);
        stroke-width: 2px;
        cursor: pointer;
        transition: 100ms all;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin-bottom: 10px;
    }

    svg:hover {
        opacity: 0.8;
    }

    svg:active {
        transform: scale(0.95);
    }

    @media screen and (max-width: 720px) {
        svg {
            margin-bottom: 0;
            margin-top: 0;
            margin-right: 20px;
            cursor: default;
        }

        svg:hover {
            opacity: 1;
        }
    }

    @media screen and (max-width: 520px) {
        svg {
            width: 40px;
            height: 40px;
            margin-right: 10px;
        }
    }
</style>
