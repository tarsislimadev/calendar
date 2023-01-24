FROM tmvdl/android:ionic

WORKDIR /app

RUN cordova create calendar com.brtmvdl.calendar calendar

WORKDIR /app/calendar

COPY www/html www

RUN cordova platform add android

RUN cordova build android
