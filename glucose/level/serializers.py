from rest_framework import serializers
from .models import Level


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = (
            "id",
            "user",
            "device",
            "device_number",
            "timestamp",
            "measure_type",
            "glucose_level",
        )
