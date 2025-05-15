from typing import Optional
from app.core.config import settings

def generate_map_url(
    start_location: str,
    end_location: str,
    start_lat: Optional[float] = None,
    start_lng: Optional[float] = None,
    end_lat: Optional[float] = None,
    end_lng: Optional[float] = None,
) -> str:
    """
    Generate a Google Maps URL for directions between two locations.
    If coordinates are provided, they will be used; otherwise, the location strings will be used.
    """
    base_url = "https://www.google.com/maps/dir/?api=1"
    
    # Use coordinates if available, otherwise use location strings
    origin = f"{start_lat},{start_lng}" if start_lat and start_lng else start_location
    destination = f"{end_lat},{end_lng}" if end_lat and end_lng else end_location
    
    # Construct the URL
    url = f"{base_url}&origin={origin}&destination={destination}"
    
    return url

def generate_mapbox_url(
    start_location: str,
    end_location: str,
    start_lat: Optional[float] = None,
    start_lng: Optional[float] = None,
    end_lat: Optional[float] = None,
    end_lng: Optional[float] = None,
) -> str:
    """
    Generate a Mapbox URL for directions between two locations.
    If coordinates are provided, they will be used; otherwise, the location strings will be used.
    """
    base_url = "https://api.mapbox.com/directions/v5/mapbox/driving"
    
    # Use coordinates if available, otherwise use location strings
    origin = f"{start_lat},{start_lng}" if start_lat and start_lng else start_location
    destination = f"{end_lat},{end_lng}" if end_lat and end_lng else end_location
    
    # Construct the URL
    url = f"{base_url}/{origin};{destination}?access_token={settings.MAPBOX_API_KEY}"
    
    return url 