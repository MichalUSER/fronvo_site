<script lang="ts">
    import { goto } from '$app/navigation';
    import Loading from '$lib/app/Loading.svelte';
    import HomeGrass from '$lib/app/main/panels/home/HomeGrass.svelte';
    import HomePosts from '$lib/app/main/panels/home/HomePosts.svelte';
    import { homePosts } from 'stores/app/home';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { loadHomePosts } from 'utilities/app/home';

    goto('/home', {
        replaceState: true,
    });

    onMount(async () => {
        // Don't reload posts
        !$homePosts && (await loadHomePosts());
    });
</script>

<div class="home-container" in:fade={{ duration: 300, delay: 200 }}>
    {#if $homePosts}
        <h1 id="latest-posts">Latest posts</h1>

        <hr in:fade={{ duration: 250, delay: 400 }} />

        <HomePosts />

        <HomeGrass />
    {:else}
        <Loading text="Loading posts.." />
    {/if}
</div>

<style>
    .home-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 100px;
        margin-right: 100px;
    }

    .home-container #latest-posts {
        color: transparent;
        background: linear-gradient(
            90deg,
            #ff81ea 10.42%,
            #dbc2ff 54.68%,
            #64c1ff 99.98%
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 3rem;
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    hr {
        width: 150px;
        margin-top: 15px;
    }

    @media screen and (max-width: 720px) {
        .home-container {
            margin-left: 0;
            margin-right: 0;
        }

        .home-container #latest-posts {
            font-size: 2.7rem;
            margin: 0;
        }

        hr {
            margin-top: 10px;
        }
    }

    @media screen and (max-width: 520px) {
        .home-container #latest-posts {
            font-size: 2.3rem;
            margin: 0;
        }

        hr {
            margin-top: 5px;
        }
    }
</style>
