from fastapi import FastAPI
app=FastAPI()
@app.get('/health')
async def h():
    return {'ok':True}
