import sys

def getName(name, age):
    print (name + " : " + age)

# 파이썬을 직접 실행하면 내부 변수 __name__에 __main__값이 할당된다. 따라서 if 함수가 실행됨
if __name__ == '__main__': 
    getName(sys.argv[1], sys.argv[2])