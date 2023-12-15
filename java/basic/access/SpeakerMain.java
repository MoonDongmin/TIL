package basic.access;

public class SpeakerMain {
  public static void main(String[] args) {
    Speaker speaker = new Speaker(90);
    speaker.showVolume();

    speaker.volumeUp();
    speaker.showVolume();

    speaker.volumeUp();
    speaker.showVolume();

    // 필드에 집적 접근
    System.out.println("volume 필드 접근 직접 수정");
//    speaker.volume = 200;
    speaker.showVolume();
  }
}
