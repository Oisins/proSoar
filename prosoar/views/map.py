from flask import Blueprint, request, send_from_directory

bp = Blueprint('map_tiles', __name__)


@bp.route("/map/<path:name>")
def download_file(name):
    return send_from_directory(
        "../static/OFM/256/latest/", name
    )


@bp.route("/map2/<path:name>")
def download_file2(name):
    z, x, y = name.split("/")
    y, _ = y.split(".")
    return send_from_directory(
        "../static/OFM/tiles/", f"{z}_{x}_{y}.png"
    )
