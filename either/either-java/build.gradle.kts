plugins {
    id("java")
}

group = "wiosft.exercise"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.vavr:vavr:0.10.4")
    implementation("org.apache.httpcomponents.client5:httpclient5:5.1")
    implementation("com.google.code.gson:gson:2.8.9")
    implementation("org.slf4j:slf4j-nop:1.7.32")
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}

tasks.test {
    useJUnitPlatform()
}