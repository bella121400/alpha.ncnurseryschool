//alert('연결성공');

//header 세로형 2단 메뉴
$(function () {
  //메뉴 활성화
  const $nav = $("nav");
  const $gnb = $nav.children(".gnb");
  const $mnus = $gnb.children("li");
  const $lnb = $gnb.find(".lnb");
  const $clse = $nav.children(".clse");
  const $btnGnb = $nav.prev();

  let mnuIdx = null;
  let winWidth = null; //브라우저의 가로폭

  //브라우저의 가로폭 측정
  $(window).on("load resize", function () {
    winWidth = window.innerWidth;
  });

  $mnus.on("mouseenter", function (evt) {
    //PC
    if (winWidth > 640) {
      mnuIdx = $mnus.index(this);
      $lnb.stop().fadeOut(20).eq(mnuIdx).fadeIn(50);
      evt.stopPropagation();
    }
  });
  $mnus.on("mouseleave", function () {
    //PC
    if (winWidth > 640) {
      $lnb.stop().fadeOut(20);
    }
  });

  $btnGnb.on("click", function () {
    $nav.show().css({ backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 100 });
    $gnb.add(".clse").stop().animate(
      {
        marginLeft: "0",
      },
      200
    );
  });
  //모바일
  $clse.on("click", function () {
    $nav.hide();
    $gnb.add(this).stop().animate(
      {
        marginLeft: "-100%",
      },
      200
    );
  });

  $(window).on("resize", function () {
    if (winWidth <= 640) {
      $nav.hide();
    } else {
      $nav.show().css({ backgroundColor: "transparent" });
      $gnb.css({ marginLeft: 0 });

      //하위메뉴 초기화
      $mnus.removeClass("on");
      $lnb.hide();
    }
  });

  //모바일에서 하위메뉴 노출
  $mnus.on("click", function (evt) {
    if (winWidth <= 640) {
      mnuIdx = $mnus.index(this);
      $(this).toggleClass("on").siblings().removeClass("on");
      $(this).children(".lnb").stop().slideToggle(100);
      $mnus.not(".on").children(".lnb").stop().slideUp(100);
    }
  });
});

//slide 영역
$(function () {
  const $container = $("section .slides-container");
  const $indicator = $("section .slides-pagination > li > a");
  const $btnPrev = $("section .slides-prev");
  const $btnNext = $("section .slides-next");
  const $slides = $container.children("li");

  let nowIdx = 0;

  //인디케이터에 대한 click 이벤트 구문
  $indicator.on("click", function (evt) {
    evt.preventDefault();
    nowIdx = $indicator.index(this);
    $indicator.eq(nowIdx).parent().addClass("on").siblings().removeClass("on");
    $container.stop().animate({ left: -(100 * nowIdx) + "%" }, 400);
  });

  //다음 버튼에 대한 click 이벤트 구문
  $btnNext.on("click", function (evt) {
    evt.preventDefault();

    if (nowIdx < $indicator.length - 1) {
      nowIdx++;
    } else {
      nowIdx = 0;
    }

    $indicator.eq(nowIdx).parent().addClass("on").siblings().removeClass("on");
    $container
      .stop()
      .animate({ left: -(100 * nowIdx) + "%" }, 400, "easeInOutCubic");
  });

  //이전 버튼에 대한 click 이벤트 구문
  $btnPrev.on("click", function (evt) {
    evt.preventDefault();

    if (nowIdx > 0) {
      nowIdx--;
    } else {
      nowIdx = $indicator.length - 1;
    }

    $indicator.eq(nowIdx).parent().addClass("on").siblings().removeClass("on");
    $container
      .stop()
      .animate({ left: -(100 * nowIdx) + "%" }, 400, "easeInOutCubic");
  });
});

//aside 구문
$(function () {
  $(window).on("scroll", function () {
    const $aside = $("aside");
    //1. 현재 스크롤바의 top값 추출
    let scrollTop = Math.ceil($(this).scrollTop());
    //2.맨 위로 가기 top버튼
    //view>0 이면 푸터가 화면에 노출되었다는 것을 의미
    const view = scrollTop + $(window).height() - $("footer").offset().top;

    if (view > 0) {
      //푸터노출
      $aside.css("margin-bottom", view);
    } else {
      $aside.css("margin-bottom", 0);
    }

    //3.top버튼 노출처리
    if (scrollTop > 120) {
      $aside.fadeIn();
    } else {
      $aside.fadeOut();
    }
  });
});

//footer 영역
$(function () {
  const $sites = $("footer>.info>.sites>li>a");
  const $site = $("footer .site");

  $sites.on("click", function (evt) {
    evt.preventDefault();

    $site.toggle();
  });
});

$(function () {
  //모바일 전용 메뉴버튼

  const $btnGnb = $(".btn-gnb");
  const $gnb = $("header .gnb");

  $btnGnb.on("click", function () {
    $(this).toggleClass("clse");
    $gnb.toggle();
  });

  $(".logo, aside").on("click", function (evt) {
    evt.preventDefault();
    $("html,body").animate({ scrollTop: 0 });
  });
});
