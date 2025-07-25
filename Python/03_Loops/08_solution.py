import math

number = 28
is_prime = True

if number > 1:
    for i in range(2, int(math.sqrt(number)) + 1):
        if number % i == 0:
            is_prime = False
            break
else:
    is_prime = False  # handle case for number <= 1

print(is_prime)
