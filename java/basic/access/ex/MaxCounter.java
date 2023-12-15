package basic.access.ex;

public class MaxCounter {
  private int count = 0;
  int max;

  public MaxCounter(int max) {
    this.max = max;
  }

  public void increment() {
    if (max > count) {
      count++;
    } else {
      System.out.println("더 이상 증가할 수 없습니다.");
    }
  }

  public int getCount() {
    return count;
  }
}
