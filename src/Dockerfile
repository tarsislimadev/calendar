FROM tmvdl/android:ionic

WORKDIR /app

RUN cordova create hello com.example.hello

WORKDIR /app/hello

RUN cordova platform add android

COPY ./www/html www

RUN cordova build android

WORKDIR /dist

RUN cp /app/hello/platforms/android/app/build/outputs/apk/debug/*.apk . -rfv

CMD echo OK
