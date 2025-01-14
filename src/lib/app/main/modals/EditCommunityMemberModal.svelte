<script lang="ts">
    import { goto } from '$app/navigation';
    import { joinedCommunity } from 'stores/app/communities';
    import { targetCommunityMember } from 'stores/app/main';
    import {
        profileLoadingFinished,
        targetProfile,
        userData,
        userPosts,
    } from 'stores/app/profile';
    import { socket } from 'stores/global';
    import { dismissModal, fetchUser } from 'utilities/app/main';
    import { loadProfilePosts } from 'utilities/app/profile';

    async function viewProfile(): Promise<void> {
        dismissModal(() => {
            goto(`/profile/${newProfile}`, {
                replaceState: true,
            });
        });

        // Reset everything for cool transitions
        $userData = undefined;
        $userPosts = undefined;
        $profileLoadingFinished = false;

        // Start loading the new profile
        const newProfile = $targetCommunityMember.profileId;

        $targetProfile = newProfile;

        // Update profile panel
        $userData = await fetchUser(newProfile);

        const isAccessible =
            $userData.isFollower || $userData.isSelf || !$userData.isPrivate;

        if (isAccessible) {
            await loadProfilePosts(newProfile);
        } else {
            userPosts.set([]);
        }
    }

    function hasChatPerms(): boolean {
        return $joinedCommunity.acceptedChatRequests.includes(
            $targetCommunityMember.profileId
        );
    }

    function updateChatPerms(): void {
        const newChatPermState = !hasChatPerms();

        socket.emit(
            'updateChatRequest',
            {
                profileId: $targetCommunityMember.profileId,
                accepted: newChatPermState,
            },
            () => {
                socket.emit(
                    'fetchCommunityData',
                    { communityId: $joinedCommunity.communityId },
                    ({ communityData }) => {
                        $joinedCommunity = communityData;

                        dismissModal();
                    }
                );
            }
        );
    }
</script>

<div class="edit-container">
    <div class="header-container">
        <h1 id="header">Edit Member</h1>
    </div>

    <hr />

    <div class="data-container">
        <img
            id="avatar"
            alt={`${$targetCommunityMember.username}'s avatar`}
            src={$targetCommunityMember.avatar
                ? $targetCommunityMember.avatar
                : '/svgs/profile/default.svg'}
            draggable={false}
        />
        <h1 id="username">{$targetCommunityMember.username}</h1>

        {#if $targetCommunityMember.bio}
            <h1 id="bio">{$targetCommunityMember.bio}</h1>
        {/if}

        <button on:click={viewProfile}>View profile</button>
        <button on:click={updateChatPerms}
            >{hasChatPerms() ? 'Revoke' : 'Give'} chat permission</button
        >
    </div>

    <div class="options-container">
        <button on:click={() => dismissModal()}>Close</button>
    </div>
</div>

<style>
    hr {
        width: 100px;
    }

    .edit-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }

    .header-container {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .header-container #header {
        font-size: 3rem;
        margin: 0;
        padding-right: 5px;
    }

    .data-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        width: 40%;
        min-width: 450px;
    }

    .data-container button {
        font-size: 1.8rem;
        margin-top: 20px;
    }

    .data-container #avatar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 128px;
        height: 128px;
        border-radius: 10px;
    }

    .data-container #username {
        font-size: 3rem;
        margin: 0;
        margin-right: 10px;
        margin-left: 10px;
        color: var(--profile_info_color);
        text-align: center;
    }

    .data-container #bio {
        font-size: 1.7rem;
        margin: 0;
        margin-left: 10px;
        margin-right: 10px;
        color: var(--profile_info_color);
        text-align: center;
        white-space: pre-wrap;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
    }

    .options-container {
        display: flex;
        margin-bottom: 15px;
        margin-top: 10px;
    }

    .options-container button {
        font-size: 2.2rem;
        margin-right: 20px;
    }

    @media screen and (max-width: 720px) {
        .header-container #header {
            font-size: 2.4rem;
        }

        .data-container {
            width: 350px;
            min-width: auto;
        }

        .data-container button {
            font-size: 1.6rem;
        }

        .data-container #avatar {
            width: 120px;
            height: 120px;
        }

        .data-container #username {
            font-size: 2.6rem;
        }

        .data-container #bio {
            font-size: 1.5rem;
        }

        .options-container button {
            font-size: 1.8rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .header-container #header {
            font-size: 2rem;
        }

        .data-container {
            width: 300px;
        }

        .data-container button {
            font-size: 1.4rem;
        }

        .data-container #avatar {
            width: 100px;
            height: 100px;
        }

        .data-container #username {
            font-size: 2.1rem;
        }

        .data-container #bio {
            font-size: 1.2rem;
        }

        .options-container button {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
