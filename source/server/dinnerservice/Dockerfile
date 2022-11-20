# spring을 어떤 jdk버전위에서 돌리냐에 따라 다릅니다. 저는 jdk11을 사용했습니다.
FROM adoptopenjdk/openjdk11:ubi

# 사용자
LABEL maintainer=kyjjulia07@gmail.com

# manifest파일 경로
VOLUME /tmp

# 컨테이너가 열어줄 포트 번호를 지정합니다.
EXPOSE 8080

# jar file 결정
ARG JAR_FILE=build/libs/*.jar

# 지정된 jar파일을 이름.jar로 생성
ADD ${JAR_FILE} springboot-chat-streaming.jar

# Run the jar file
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/springboot-chat-streaming.jar"]
