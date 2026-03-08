from app.bootstrap.settings import Settings, get_settings


def build_container() -> dict[str, Settings]:
    return {"settings": get_settings()}
