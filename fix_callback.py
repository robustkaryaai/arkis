with open("app/auth/web-callback/page.js", "r") as f:
    content = f.read()

# Replace rkphone:// with rkphone:// or rk-ai://
content = content.replace("redirect.startsWith('rkphone://')", "(redirect.startsWith('rkphone://') || redirect.startsWith('rk-ai://'))")
content = content.replace("nextUrl.startsWith('rkphone://')", "(nextUrl.startsWith('rkphone://') || nextUrl.startsWith('rk-ai://'))")

with open("app/auth/web-callback/page.js", "w") as f:
    f.write(content)
