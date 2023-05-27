'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//248.Our First AJAX Call: XMLHttpRequest
//一番伝統的な非同期通信の方法：XML HTTPリクエスト

const getCountryData = function(country){
  //↓XMLHttpRequestで呼び出し、requestという変数に格納する
  //XMLHttpRequest()は古いやり方ですが、ここで扱うのは理由がある。
  //REASON1:存在していることを理解する
  //REASON2:かつてAJAXの呼び出しが、イベントやコールバック関数でどのように処理されていたかを紹介するため
  const request = new XMLHttpRequest();
  //変数を呼び出し、リクエストのタイプを第一引数に渡す.
  //データを取得するためのHTTPリクエストの種類はGETということを覚えておくように.
  //第二引数には、実際にAJAXを呼び出すべきURLを含む文字列が必要.webapiで調べると、githubが出てきて、そこでREST CountriesというwebAPIを選択して、名前検索してできるようにしてみた。
  request.open('GET',`https://countries-api-836d.onrender.com/countries/name/${country}`);
  request.send();
  //responseTextはXMLHttpRequestのオフィシャルなプロパティです。

  request.addEventListener('load',function(){
    //ここで取れるデータはJSON(大きな文字列）のためそれをjsに変換しないといけない
    // console.log(this.responseText);
    // console.log(this.status); //200ならOK

    const [data] = JSON.parse(this.responseText);
    //parse!perseといつも間違える！
    console.log(data);
    //⇨ここですることで、配列にまとめられたみやすいデータになる


    const html = `
      <article class="country">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData('portugal');
getCountryData('cuba');
getCountryData('italy');

///////////////////////////////////////
////////座学///////////////
//246.Asynchronous JavaScript, AJAX and APIs
//非同期 JSとは、？？
//まず同期JSとは、コードが定義した通りの実行順序で実行されること。上から順番に的な。だから、各コードは常に前の行の実行終了を待ちます。
//⇨問題点は、１行のコードの実行に長い時間がかかるということが発生する
//ex)alert('CAUTION'); alertはコードの実行をブロックする最高の例。そのアラートを消すまで次のコードは実行されません
//非同期JSは例えば、setTimeoutで何秒後かにコールバック関数を実行するタイプ。これはコード実行を邪魔することなく、バックグラウンドで動作することになる。
//⚠️勘違いしてはいけないのが、「コールバック関数」「イベントリスナー」の全て非同期になるのかというとそうではない。なるやつとならないやつがあるので、それを知るだけでいい。
//Ajaxの呼び出しは、非同期JSの中で最も重要
//Ajax ：遠隔地のwebサーバーと非同期で通信することを可能にするもの
//webサーバから動的にデータを要求するためにコード内でAjaxを呼び出す。リロードすることなく、そのデータを動的に使用することができる
//まず、Ajaxの仕組みを簡単に理解
//クライアントとウェブサーバーのやり取りは全てバックグラウンドで非同期に行われる
//APIには色々とあるが、online APIのことを、単にAPIを指すことが多い
