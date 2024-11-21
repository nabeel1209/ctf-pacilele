import base64
import itertools

encoded_string = "/P18yZTTe0JSVVFRUX1NFzYwfQ==UlVLQU4TkVUU09c3ODQyYRfQlJVV"

def decode_and_check(encoded):
    try:
        decoded_bytes = base64.b64decode(encoded)
        decoded_string = decoded_bytes.decode('utf-8')
        if "NETSOS{" in decoded_string and "}" in decoded_string:
            return decoded_string
    except Exception:
        pass
    return None

# Generate permutations of the encoded string
for perm in itertools.permutations(encoded_string):
    perm_string = ''.join(perm)
    flag = decode_and_check(perm_string)
    if flag:
        print("Flag found:", flag)
        break
else:
    print("Flag not found in permutations.")