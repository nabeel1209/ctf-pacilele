n = open('ciphertext', 'r').read()
# print(bytes(n.encode()))
test = list(bytes(n.encode()))
print(test)
print(''.join(chr(ord(a) ^ ord(b)) for a, b in zip(n, n[1:])), file=open('plaintext', 'w'))