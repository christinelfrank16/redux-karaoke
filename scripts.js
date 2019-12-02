// LYRICS INFO
const songList = {
    1: `Well I've heard there was a secret chord,
        That David played and it pleased the Lord,
        But you don't really care for music do you?,
        Well it goes like this:,
        The fourth the fifth the minor fall and the major lift,
        The baffled king composing Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Well your faith was strong but you needed proof,
        You saw her bathing on the roof,
        Her beauty and the moonlight overthrew ya,
        She tied you to her kitchen chair,
        And she broke your throne and she cut your hair,
        And from your lips she drew the Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        But baby I've been here before,
        I've seen this room and I've walked this floor,
        You know I used to live alone before I knew ya,
        And I've seen your flag on the marble arch,
        And love is not a victory march,
        It's a cold and it's a broken Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Well there was a time when you let me know,
        What's really going on below,
        But now you never show that to me do ya,
        But remember when I moved in you,
        And the holy dove was moving too,
        And every breath we drew was Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Maybe there's a God above,
        But all I've ever learned from love,
        Was how to shoot somebody who outdrew ya,
        And it's not a cry that you hear at night,
        It's not somebody who's seen the light,
        It's a cold and it's a broken Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah,
        Hallelujah`.split(','),
    2: `I remember conversations,
        We were dancing up on tables,
        Taking pictures when we had nowhere to post,
        You were laughin' I was cryin',
        We were dancin' we were dyin',
        Sometimes I don't know how we walked away,
        If I'm honest what I liked,
        Were the things we didn't know,
        Every morning every night,
        I'd be beating down your door,
        Just to tell you what I'm thinking,
        But you already know,
        Screw this I don't wanna let it go,
        So can we pretend that I'm 22 today?,
        Dancin' on the tables with you oh yeah,
        Can we pretend that we all end up okay?,
        I just wanna forget with you oh yeah,
        Can we pretend that we both like the president?,
        Can we pretend that I really like your shoes? Hell yeah,
        Can we pretend? 'Cause honestly reality it bores me,
        Let's pretend oh let's make believe,
        Can we can we pretend?,
        Can we pretend?,
        I remember what we wanted,
        What we'd never take for granted,
        How our daddy issues took us to LA,
        If I'm honest what I miss,
        Is not knowin' what to say,
        And the feeling of your lips,
        And it haunts me every day,
        When you'd tell me what you're thinking,
        But I'd already know,
        Screw this I don't wanna let it go,
        Oh yeah,
        So can we pretend that I'm 22 today?,
        Dancin' on the tables with you oh yeah,
        Can we pretend that we all end up okay?,
        I just wanna forget with you oh yeah,
        Can we pretend that we both like the way it is? Hell yeah,
        Can we pretend that we like these fake-ass dudes? Oh yeah,
        Can we pretend? 'Cause honestly reality it bores me,
        Let's pretend oh let's make believe,
        Can we can we pretend?,
        Can we pretend?,
        If I'm honest what I liked,
        Were the things we didn't know,
        Every morning every night,
        I'd be beating down your door,
        Just to tell you what I'm thinking,
        But you'd already know,
        Screw this I don't wanna let it go,
        So can we pretend that we both like the president?,
        Can we pretend that you like my fake-ass shoes? Oh yeah,
        Can we pretend? 'Cause honestly reality it bores me,
        Let's pretend oh let's make believe,
        Can we can we pretend?,
        Can we pretend?,
        Oh can we pretend?,
        Can we? Let's make believe,
        Can we (Can we),
        Can we pretend? 'Cause honestly reality it bores me,
        Let's pretend oh let's make believe,
        Can we wan we pretend?,
        Honestly`.split(',')
};


    // INITIAL REDUX STATE
const initialState = {
    currentSongId: null,
    songsById: {
        1: {
            title: 'Hallelujah',
            artist: 'Jeff Buckley',
            songId: 1,
            songArray: songList[1],
            arrayPostion: 0,
        },
        2: {
            title: 'Can we Pretend',
            artist: 'P!nk',
            songId: 2,
            songArray: songList[2],
            arrayPostion: 0,
        }
    }
}

// REDUCER WILL GO HERE
const lyricChangeReducer = (state = initialState.songsById, action ) => {
    let newArrayPosition;
    let newSongsByIdEntry;
    let newSongsByIdStateSlice;
    switch (action.type){
        case 'NEXT_LYRIC':
            newArrayPosition = state[action.currentSongId].arrayPostion + 1;
            newSongsByIdEntry = Object.assign({}, state[action.currentSongId], { arrayPostion: newArrayPosition});
            newSongsByIdStateSlice = Object.assign({}, state, {[action.currentSongId]: newSongsByIdEntry});
            return newSongsByIdStateSlice;
        case 'RESTART_SONG':
            newSongsByIdEntry = Object.assign({}, state[action.currentSongId], { arrayPostion: 0 });
            newSongsByIdStateSlice = Object.assign({}, state, { [action.currentSongId]: newSongsByIdEntry });
            return newSongsByIdStateSlice;
        default:
            return state;
    }
};

const songChangeReducer = (state = initialState.currentSongId, action ) => {
    switch (action.type) {
        case 'CHANGE_SONG':
        return action.newSelectedSongId
        
        default:
        return state;
    }
}

const rootReducer = this.Redux.combineReducers({
    currentSongId: songChangeReducer,
    songsById: lyricChangeReducer
});

// REDUX STORE
const { createStore } = Redux;
const store = createStore(rootReducer);
console.log(store.getState());

console.log(initialState);

// JEST TESTS + SETUP GO HERE
const { expect } = window;

expect(lyricChangeReducer(initialState.songsById, { type: null})).toEqual(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, { type: 'NEXT_LYRIC', currentSongId: 2 })).toEqual({
    1: {
        title: 'Hallelujah',
        artist: 'Jeff Buckley',
        songId: 1,
        songArray: songList[1],
        arrayPostion: 0,
    },
    2: {
        title: 'Can we Pretend',
        artist: 'P!nk',
        songId: 2,
        songArray: songList[2],
        arrayPostion: 1,
    }
});

expect(lyricChangeReducer(initialState.songsById, { type: 'RESTART_SONG', currentSongId: 1 })).toEqual({
    1: {
        title: 'Hallelujah',
        artist: 'Jeff Buckley',
        songId: 1,
        songArray: songList[1],
        arrayPostion: 0,
    },
    2: {
        title: 'Can we Pretend',
        artist: 'P!nk',
        songId: 2,
        songArray: songList[2],
        arrayPostion: 0,
    }
});

expect(songChangeReducer(initialState, { type: null})).toEqual(initialState);

expect(songChangeReducer(initialState.currentSongId, { type: 'CHANGE_SONG', newSelectedSongId: 1})).toEqual(1);

expect(rootReducer(initialState, { type: null })).toEqual(initialState);
expect(store.getState().currentSongId).toEqual(songChangeReducer(undefined, { type: null }));
expect(store.getState().songsById).toEqual(lyricChangeReducer(undefined, { type: null }));


// RENDERING STATE IN DOM
const renderLyrics = () => {
    const lyricsDisplay = document.getElementById('lyrics');

    while(lyricsDisplay.firstChild) {
        lyricsDisplay.removeChild(lyricsDisplay.firstChild);
    }
    if(store.getState().currentSongId){
        const currentLine = store.getState().songsById[store.getState().currentSongId].songArray[store.getState().songsById[store.getState().currentSongId].arrayPostion];
        const renderedLine = document.createTextNode(currentLine);
        document.getElementById('lyrics').appendChild(renderedLine);
    } else {
        const selectSongMessage = document.createTextNode("Select a song from the menu above to sing along!");
        document.getElementById('lyrics').appendChild(selectSongMessage);
    }
}

const renderSongs = () => {
    const songsById = store.getState().songsById;
    for(const songKey in songsById){
        const song = songsById[songKey];
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const em = document.createElement('em');
        const songTitle = document.createTextNode(song.title);
        const songArtist = document.createTextNode(' by ' + song.artist);
        em.appendChild(songTitle);
        h3.appendChild(em);
        h3.appendChild(songArtist);
        h3.addEventListener('click', function() {
            selectSong(song.songId);
        });
        li.appendChild(h3);
        document.getElementById('songs').appendChild(li);
    }
}

window.onload = function() {
    renderSongs();
    renderLyrics();
}

// CLICK LISTENER
const selectSong = (newSongId) => {
    let action;
    if(store.getState().currentSongId) {
        action = {
            type: 'RESTART_SONG',
            currentSongId: store.getState().currentSongId
        }
        store.dispatch(action);
    }
    action = {
        type: 'CHANGE_SONG',
        newSelectedSongId: newSongId
    }
    store.dispatch(action);
}

const userClick = () => {
    const currentState = store.getState().songsById[store.getState().currentSongId];
    if(currentState.arrayPostion === currentState.songArray.length -1 ){
        store.dispatch({    type: 'RESTART_SONG',
                            currentSongId: store.getState().currentSongId });
    } else {
        store.dispatch({    type: 'NEXT_LYRIC',
                            currentSongId: store.getState().currentSongId });
    }
    console.log(store.getState());
  }

// SUBSCRIBE TO REDUX STORE
store.subscribe(renderLyrics);