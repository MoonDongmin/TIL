package basic.loop;

public class WhileEx3 {
  public static void main(String[] args) {
    int sum = 0;
    int max = 2;
    int i = 1;

    while (i <= max) {
      sum += i;
      i++;
    }
    System.out.println(sum);
  }
}
