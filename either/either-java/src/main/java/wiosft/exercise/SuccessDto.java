package wiosft.exercise;

public class SuccessDto {
  String id;
  String name;
  String email;

  @Override
  public String toString() {
    return "SuccessDto{" +
            "id='" + id + '\'' +
            ", name='" + name + '\'' +
            ", email='" + email + '\'' +
            '}';
  }
}
