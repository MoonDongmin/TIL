package basic.method;

public class MethodeReturn1 {
  public static void main(String[] args) {
    boolean result = odd(2);
    System.out.println(result);
  }

  public static boolean odd(int i) {
    if (i % 2 == 0) {
      return true;
    } else return false; // 이 부분이 무조건 들어가야해
  }
}
