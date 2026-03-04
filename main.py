import numpy as np

class GenTopPer:
    def __init__(self):
        self.user_interest_vectors = [
            np.random.uniform(-1, 1, 512), 
            np.random.uniform(-1, 1, 512), 
            np.random.uniform(-1, 1, 512) 
        ] 

    def get_similarity(self, v1, v2):
        dot_product = np.dot(v1, v2)
        norm_v1 = np.linalg.norm(v1)
        norm_v2 = np.linalg.norm(v2)
        return dot_product / (norm_v1 * norm_v2)

    def calculate_final_score(self, video_vector, video_stats, recent_video_vectors):
        similarities = [self.get_similarity(video_vector, u_vec) for u_vec in self.user_interest_vectors]
        best_match_score = max(similarities) if similarities else 0.5
        vcr = video_stats.get('completes', 0) / (video_stats.get('starts', 1) + 1)
        starts = video_stats.get('starts', 0) + 1
        likes = video_stats.get('likes', 0)
        PRIOR_LIKE_RATE = 0.10
        PRIOR_WEIGHT = 20
        like_rate = (likes + PRIOR_LIKE_RATE * PRIOR_WEIGHT) / (starts + PRIOR_WEIGHT)
        datePenalty = 1
        if video_stats.get('months', 0) > 12: date_penalty = 0.895
        elif video_stats.get('months', 0) > 5: date_penalty = 0.935
        elif video_stats.get('months', 0) > 1: date_penalty = 0.97
        if 50000 < video_stats.get('starts', 1) > 1000:
            start_penalty = .97
            if video_stats.get('likes', 1) > 2000:
                start_penalty = .93
        elif 50000 >= video_stats.get('starts', 1):
            start_penalty = .85
        else: start_penalty = 1
        quality_score = ((vcr * 0.7) + (like_rate * 0.3)) * ((datePenalty+start_penalty)/2)
        diversity_penalty = 1.0
        for seen_vec in recent_video_vectors:
            if self.get_similarity(video_vector, seen_vec) > 0.80:
                diversity_penalty = 0.2
                break

        return (best_match_score * 0.4 + quality_score * 0.6) * diversity_penalty

    def build_feed(self, candidate_pool, num_to_return=5):
        feed = []
        recent_vecs = [] 
        
        while len(feed) < num_to_return and candidate_pool:
            scored_candidates = []
            for vid in candidate_pool:
                score = self.calculate_final_score(vid['vector'], vid['stats'], recent_vecs)
                scored_candidates.append((score, vid))
            scored_candidates.sort(key=lambda x: x[0], reverse=True)
            winner_score, winner_vid = scored_candidates[0]
            
            feed.append({"id": winner_vid['id'], "score": round(winner_score, 4)})
            recent_vecs.append(winner_vid['vector'])
            candidate_pool.remove(winner_vid) 
            
            if len(recent_vecs) > 3: recent_vecs.pop(0)
            
        return feed


algo = GenTopPer()
candidate_pool = [
    {
        "id": "High_Quality_Finance", 
        "vector": algo.user_interest_vectors[0] + np.random.normal(0, 0.1, 512), 
        "stats": {"starts": 1000, "completes": 900, "likes": 100, "months": 2} 
    },
    {
        "id": "Boring_Finance", 
        "vector": algo.user_interest_vectors[0] + np.random.normal(0, 0.05, 512),
        "stats": {"starts": 1000, "completes": 100, "likes": 5, "months": 20} 
    },
    {
        "id": "Funny_Dog_Video", 
        "vector": algo.user_interest_vectors[1] + np.random.normal(0, 0.1, 512), 
        "stats": {"starts": 500, "completes": 400, "likes": 50, "months": 100}
    },
    {
        "id": "Random_Spam", 
        "vector": np.random.uniform(-1, 1, 512), 
        "stats": {"starts": 100, "completes": 5, "likes": 0, "months": 30}
    },
    {
        "id": "New_Cooking_Video", 
        "vector": algo.user_interest_vectors[2] + np.random.normal(0, 0.1, 512),
        "stats": {"starts": 200, "completes": 180, "likes": 30, "months": 15}
    }
]

import numpy as np

def generate_discovery_units(candidate_dis_pool, user_interest_vectors, recent_video_vectors, num_units=2):
    def calculate_score(candidate):
        video_vector = candidate['vector']
        video_stats = candidate.get('stats', {}) 
        
        similarities = [
            np.dot(video_vector, u_vec) / (np.linalg.norm(video_vector) * np.linalg.norm(u_vec))
            for u_vec in user_interest_vectors
        ]
        best_match_score = max(similarities) if similarities else 0.5

        starts = video_stats.get('starts', 1) + 1
        vcr = video_stats.get('completes', 0) / starts
        likes = video_stats.get('likes', 0)
        PRIOR_LIKE_RATE = 0.10
        PRIOR_WEIGHT = 20

        like_rate = (likes + PRIOR_LIKE_RATE * PRIOR_WEIGHT) / (starts + PRIOR_WEIGHT)
        
        months = video_stats.get('months', 0)
        date_penalty = 1.0

        if months > 12: date_penalty = 0.9
        elif months > 5: date_penalty = 0.935
        elif months > 1: date_penalty = 0.97

        if 100000 < video_stats.get('starts', 1) > 1000:
            start_penalty = .97
            if video_stats.get('likes', 1) > 2000:
                start_penalty = .93
        elif 100000 >= video_stats.get('starts', 1):
            start_penalty = .85
        else: start_penalty = 1
        
        quality_score = ((vcr * 0.7) + (like_rate * 0.3)) * ((date_penalty+start_penalty)/2)

        diversity_penalty = 1.0
        for seen_vec in recent_video_vectors:
            sim = np.dot(video_vector, seen_vec) / (np.linalg.norm(video_vector) * np.linalg.norm(seen_vec))
            if sim > 0.80:
                diversity_penalty = 0.2
                break

        return (best_match_score * 0.4 + quality_score * 0.6) * diversity_penalty

    candidate_dis_pool.sort(key=calculate_score, reverse=True)
    
    discovery_items = []
    for _ in range(num_units):
        if candidate_dis_pool:
            discovery_items.append(candidate_dis_pool.pop(0))
            
    return discovery_items

candidate_pool_discover = [
    {
        "id": "High_Quality_Finance", 
        "vector": algo.user_interest_vectors[0] + np.random.normal(0, 0.1, 512), 
        "stats": {"starts": 1000, "completes": 900, "likes": 100, "months": 2} 
    },
    {
        "id": "Boring_Finance", 
        "vector": algo.user_interest_vectors[0] + np.random.normal(0, 0.05, 512),
        "stats": {"starts": 1000, "completes": 100, "likes": 5, "months": 20} 
    },
    {
        "id": "Funny_Dog_Video", 
        "vector": algo.user_interest_vectors[1] + np.random.normal(0, 0.1, 512), 
        "stats": {"starts": 500, "completes": 400, "likes": 50, "months": 100}
    },
    {
        "id": "Random_Spam", 
        "vector": np.random.uniform(-1, 1, 512), 
        "stats": {"starts": 100, "completes": 5, "likes": 0, "months": 30}
    },
    {
        "id": "New_Cooking_Video", 
        "vector": algo.user_interest_vectors[2] + np.random.normal(0, 0.1, 512),
        "stats": {"starts": 200, "completes": 180, "likes": 30, "months": 15}
    }
]
final_feed = algo.build_feed(candidate_pool, num_to_return=5)

discovery_vids = generate_discovery_units(
    candidate_pool_discover, 
    [np.random.uniform(-1, 1, 512)],  
    [np.random.uniform(-1, 1, 512)]  
)
for i, item in enumerate(final_feed):
    print(f"position{i+1}:score:{item['score']}")
for i, item in enumerate(discovery_vids):
    print(f"{item['id']}")
