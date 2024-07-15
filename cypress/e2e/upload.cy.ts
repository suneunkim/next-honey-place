import 'cypress-file-upload'

describe('업로드 페이지의 기본 렌더링 및 입력과 버튼 검증 확인하기', () => {
  it('사진 등록, 검색 모달창 입력, 설명 입력하면 등록 버튼이 활성화 된다.', () => {
    cy.visit('/place/upload')

    // 제목과 Form 렌더링 확인하기
    cy.get('[data-cy="upload-title"]')
    cy.get('form').should('be.visible')

    // 사진 등록 시 미리보기가 보인다.
    const imagePath = 'testimage.PNG' // cypress/fixtures에 정적 이미지 추가
    cy.get('input[type="file"]').attachFile(imagePath)
    cy.get('img').should('be.visible')

    // 검색 모달창에서 입력하고 그 결과를 선택해서 업로드 폼에 다시 돌아온다.
    cy.get('[data-cy="right-arrow-icon"]').click()
    cy.get('[data-cy="search-modal"]').should('be.visible')
    cy.get('[data-cy="search-modal-input"]').type('카페베네')
    cy.get('[data-cy="search-modal-item"]').first().click()
    cy.get('[data-cy="upload-form-input"]').should('have.value', '카페베네')

    // 꿀플 노트 입력
    cy.get('[data-cy="upload-form-textarea"]').type(
      '정말 멋진 카페였습니다. 분위기도 좋고 커피도 맛있어요.'
    )

    // fetch 요청 모킹
    cy.intercept('POST', '/api/create-notification', {
      statusCode: 200,
      body: { success: true },
    }).as('createNotification')

    // 등록 버튼이 활성화된다.
    cy.get('[data-cy="upload-btn"]').should('not.be.disabled')
  })

  it('모달창에서 새로운 꿀플레이스 추가하기를 누른 후 단계별 페이지 이동을 거쳐서 업로드 페이지로 돌아온다.', () => {
    cy.visit('/place/upload')

    // 모달창 띄우기
    cy.get('[data-cy="right-arrow-icon"]').click()
    cy.get('[data-cy="search-modal"]').should('be.visible')
    cy.get('[data-cy="search-modal-input"]').type('새로운 가게')
    cy.get('[data-cy="add-new-place-btn"]').click()

    // 새로운 꿀플레이스 추가 페이지로 이동 확인
    cy.url().should('include', '/place/newplace')
    cy.get('[data-cy="newplace-name-input"]').should('have.value', '새로운 가게')

    // 지도 페이지로 이동
    cy.get('[data-cy="map-page-link"]').click()
    cy.url().should('include', '/place/map')

    // 지도 페이지에서 기본 주소 확인 및 위치 등록 (초기 주소값)
    cy.get('p').contains('서울특별시 중구 세종대로 110').should('be.visible')
    cy.get('[data-cy="map-btn"]').click()

    // 새로운 꿀플레이스 추가 페이지로 돌아옴
    cy.url().should('include', '/place/newplace')
    cy.get('[data-cy="newplace-name-input"]').should('have.value', '새로운 가게')
    cy.get('[data-cy="newplace-address-input"]').should(
      'have.value',
      '서울특별시 중구 세종대로 110'
    )

    // 업로드 페이지로 이동
    cy.get('[data-cy="upload-page-link"]').click()
    cy.url().should('include', '/place/upload')

    // 업로드 폼에서 입력된 장소 확인
    cy.get('[data-cy="upload-form-input"]').should('have.value', '새로운 가게')
  })
})
