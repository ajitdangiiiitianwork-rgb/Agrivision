from flask import Blueprint, request, jsonify
from pydantic import BaseModel, ValidationError, Field
from services.market_service import forecast, get_pune_mandis, get_commodities

bp = Blueprint("markets", __name__, url_prefix="/api/markets")


class MarketReq(BaseModel):
    commodity: str = "tomato"
    mandi: str = "pune"
    horizon_days: int = Field(default=7, ge=1, le=30)


@bp.route("/forecast", methods=["GET", "POST", "OPTIONS"])
def markets_forecast():
    """Return comprehensive price forecast, history, and Pune mandi comparisons."""
    if request.method == "OPTIONS":
        return "", 200

    if request.method == "GET":
        commodity = request.args.get("commodity", "tomato")
        mandi = request.args.get("mandi", "pune")
        try:
            horizon_days = int(request.args.get("horizon_days", 7))
        except ValueError:
            horizon_days = 7
        out = forecast(commodity, mandi, horizon_days)
        return jsonify(out), 200

    # POST method
    if not request.data:
        body = MarketReq()
    else:
        try:
            body = MarketReq.model_validate_json(request.data)
        except ValidationError as e:
            # Fallback to json dictionary parsing if model_validate_json fails
            json_data = request.get_json(silent=True) or {}
            body = MarketReq(
                commodity=json_data.get("commodity", "tomato"),
                mandi=json_data.get("mandi", "pune"),
                horizon_days=int(json_data.get("horizon_days", 7))
            )

    out = forecast(body.commodity, body.mandi, body.horizon_days)
    return jsonify(out), 200


@bp.get("/mandis")
def list_mandis():
    """Returns Pune district APMC mandis."""
    return jsonify({"mandis": get_pune_mandis()}), 200


@bp.get("/commodities")
def list_commodities():
    """Returns crops cultivated and traded around Pune."""
    return jsonify({"commodities": get_commodities()}), 200
