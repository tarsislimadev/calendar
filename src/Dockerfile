FROM tmvdl/android:cordova

WORKDIR /app

RUN cordova create nume com.brtmvdl.nume Nume

WORKDIR /app/nume

COPY www www

COPY cp.sh .

RUN cordova platform add android

RUN cordova build android
