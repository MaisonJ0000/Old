- 파일의 내용 검색
    - grep -r "text" .
    
- copy 
    - cp -r /home /home2  (from to) 
    
- zip
    - zip시 __MACOSX 폴더 생성하지 않도록 (https://tbang.tistory.com/83)
        - zip -r -X [압축할파일명] [압축할폴더명]
    - __MACOSX폴더를 삭제
        - zip -d 파일명.zip __MACOSX/\*
        
        
- where eslint