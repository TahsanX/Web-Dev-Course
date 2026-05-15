// interface Mediaplayer{
//     play(): void;
//     pause(): void;
//     stop(): void;
// }
// class Musicplayer implements Mediaplayer{
//     play(){
//         console.log("Play")
//     }
//     pause(){
//         console.log("Pause")
//     }
//     stop(){
//         console.log("Stop")
//     }
// }
// const tahsanmusicplayer = new Musicplayer();
// tahsanmusicplayer.play()
abstract class Prototypeplayer{
    abstract play(): void;
    abstract pause(): void;
    abstract stop(): void;
}
class Musicplayer extends Prototypeplayer{
    play(){
        console.log("Play")
    }
    pause(){
        console.log("Pause")
    }
    stop(){
        console.log("Stop")
    }
}
const tahsanmusicplayer = new Musicplayer();
tahsanmusicplayer.play()