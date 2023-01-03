

document.addEventListener('DOMContentLoaded', () => {

	//헤더 네비게이션
	let main_menu = document.querySelectorAll(".main_menu > li"),
		sub_menu = document.querySelectorAll(".sub_menu");

	// 헤더 네비게이션
	main_menu.forEach((item, index) => {
		item.addEventListener('mouseleave', function () {
			menu_invisible();
		});
		item.addEventListener('mouseenter', function () {
			sub_menu[index].classList.add('on');
		});
	})

	let menu_invisible = () => {
		for(let mf of sub_menu) {
			mf.classList.remove('on');
		}
	}

	//헤더 all_menu 
	let more_btn = document.querySelector('.more_btn'),
		all_close_btn = document.querySelector('.all_close_btn'),
		all_menu_wrap = document.querySelector('.all_menu_wrap'),
		all_menu = document.getElementById('all_menu');

	//더보기 버튼
	more_btn.addEventListener('click', () => {
		all_menu_wrap.classList.add('on');
		all_menu.style.visibility = 'visible';
	});

	//닫기 버튼
	all_close_btn.addEventListener('click', () => {
		all_menu_wrap.classList.remove('on');
		all_menu.style.visibility = 'hidden';
	});


	

	//슬라이드 
	let slide_wrapper = document.querySelector('.slide_wrapper'),
	slide_container = document.querySelector('.slide_container'),
	slides = slide_container.querySelectorAll('li'),
	slide_count = slides.length,
	currentIndex = 0,
	pager = slide_wrapper.querySelector('.pager'),
	pagerHTML = '',
	timer,
	next_btn = slide_wrapper.querySelector('#prev'),
	prev_btn = slide_wrapper.querySelector('#next');



	if(slide_count > 0) {
		slides.forEach((item, index) => {
			item.style.left = `${index*100}%`;
			pagerHTML += `<a href='#'>${index}</a>`;
		});
		pager.innerHTML = pagerHTML;
	}

	let pager_btn = pager.querySelectorAll('a');

	function gotoslide(idx) {
		//페이지 이동
		slide_container.style.left = `${idx * -100}%`;
		currentIndex = idx;


		// 페이져 버튼 초기화
		for(let pb of pager_btn) {
			pb.classList.remove('active');
		}
		pager_btn[currentIndex].classList.add('active');

		// 슬라이드 컨텐츠 활성화
		for(let sc of slides) {
			sc.classList.remove("active");
		}
		slides[currentIndex].classList.add('active');

		//좌우 버튼 활성화
		if(currentIndex == slide_count - 1) {
			prev_btn.classList.add('disabled');
		} else {
			prev_btn.classList.remove('disabled');
		}

		if(currentIndex == 0) {
			next_btn.classList.add('disabled')
		} else {
			next_btn.classList.remove('disabled')
		}

	}


	

	//페이져로 슬라이드 이동하기
	pager_btn.forEach((item, index) => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			gotoslide(index);
		});
	});

	//자동 슬라이드
	function autoslide() {
		timer = setInterval(() => {
			let nextIndex = (currentIndex + 1) % slide_count;
			gotoslide(nextIndex);
		}, 4000);
	}

	//호버시 자동 슬라이드 정지
	slide_wrapper.addEventListener('mouseover', () => {
		clearInterval(timer);
	});

	slide_wrapper.addEventListener('mouseleave', () => {
		autoslide();
	});

	//좌우 버튼으로 슬라이드 이동
	prev_btn.addEventListener('click', (e) => {
		e.preventDefault();
		if(currentIndex != slide_count - 1) {
			gotoslide(currentIndex + 1);
		}
	});

	next_btn.addEventListener('click', (e) => {
		e.preventDefault();
		if(currentIndex > 0) {
			gotoslide(currentIndex - 1);
		}
	});


	autoslide();
	gotoslide(0);
}) //DOMContentLoaded

$(function () {
	$('.lang_btn').click(function () {
		$('.lang_contents').slideToggle();
	});
});