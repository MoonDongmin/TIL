package basic.primitive_type_and_reference_type;

public class NullMain3 {
  public static void main(String[] args) {
    BigData bigData = new BigData();
    System.out.println("bigData.count= " + bigData.count);
    System.out.println("bigData.data= " + bigData.data);

    //NullPointerException
    System.out.println("bigData.data.value= " + bigData.data.value);
  }
}
