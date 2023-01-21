FROM tmvdl/android:ionic

WORKDIR /app

RUN cordova create nume com.brtmvdl.nume Nume

WORKDIR /app/nume

COPY www/html www

RUN cordova platform add android

RUN cordova build android
